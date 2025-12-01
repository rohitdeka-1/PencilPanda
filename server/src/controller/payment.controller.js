import Coupon from "../models/Coupon.model.js";
import Order from "../models/Order.model.js";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.model.js";
import { generateGPayQRCode } from "../lib/qrcode.js";
import { transporter } from "../services/mailer.services.js";

/**
 * Create checkout session and generate GPay QR code
 * For OTT subscriptions, we don't need shipping addresses
 */
export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		// Validate that each product has a duration (subscription plan)
		for (const product of products) {
			if (!product.duration) {
				return res.status(400).json({ 
					error: `Duration is required for product ${product._id || 'unknown'}. Valid values: "1 month", "3 months", "6 months", "12 months"` 
				});
			}
			const validDurations = ["1 month", "3 months", "6 months", "12 months"];
			if (!validDurations.includes(product.duration)) {
				return res.status(400).json({ 
					error: `Invalid duration "${product.duration}". Valid values: ${validDurations.join(", ")}` 
				});
			}
		}

		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		let totalAmount = 0;

		// SECURITY: Fetch prices from database, not client
		const validatedProducts = await Promise.all(
			products.map(async (clientProduct) => {
				const dbProduct = await Product.findById(clientProduct._id);
				
				if (!dbProduct) {
					throw new Error(`Product with ID ${clientProduct._id} not found`);
				}

				// Validate quantity (for subscriptions, usually 1)
				if (!clientProduct.quantity || clientProduct.quantity < 1 || clientProduct.quantity > 10) {
					throw new Error(`Invalid quantity for product ${dbProduct.name}`);
				}

				// Get price for the selected duration
				const planPrice = dbProduct.getPriceForDuration(clientProduct.duration);
				if (!planPrice) {
					throw new Error(`No price found for duration "${clientProduct.duration}" in product ${dbProduct.name}`);
				}

				const productTotal = planPrice * clientProduct.quantity;
				totalAmount += productTotal;

				return {
					_id: dbProduct._id,
					price: planPrice,
					duration: clientProduct.duration,
					quantity: clientProduct.quantity,
					name: dbProduct.name
				};
			})
		);

		let coupon = null;
		let discountAmount = 0;
		
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				discountAmount = Math.round((totalAmount * coupon.discountPercentage) / 100);
				totalAmount -= discountAmount;
			}
		}

		// Generate unique transaction ID
		const transactionId = `OTT${Date.now().toString().slice(-10)}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

		// Get GPay merchant ID from environment
		const gpayMerchantId = process.env.GPAY_MERCHANT_ID;
		if (!gpayMerchantId) {
			return res.status(500).json({ error: "GPay merchant ID not configured" });
		}

		// Generate QR code
		const qrCodeDataURL = await generateGPayQRCode({
			merchantId: gpayMerchantId,
			amount: totalAmount,
			transactionId: transactionId,
			merchantName: "OTTMOMO"
		});

		// Create pending order (will be confirmed when payment is verified)
		const newOrder = new Order({
			user: req.user._id,
			products: validatedProducts.map((product) => ({
				product: product._id,
				quantity: product.quantity,
				price: product.price,
				duration: product.duration,
			})),
			totalAmount: totalAmount,
			orderStatus: "pending",
			qrCode: qrCodeDataURL,
			transactionId: transactionId,
			couponCode: couponCode || null,
			discountAmount: discountAmount,
		});

		await newOrder.save();

		// Create coupon for large orders
		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}

		res.status(200).json({ 
			success: true,
			orderId: newOrder._id,
			qrCode: qrCodeDataURL,
			transactionId: transactionId,
			totalAmount: totalAmount,
			discountAmount: discountAmount,
			currency: "INR",
			message: "Scan the QR code to complete payment via GPay"
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error("Error processing checkout:", error);
		}
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

/**
 * Verify payment and confirm order
 * This endpoint should be called after admin verifies the payment manually
 * or through a webhook if you set up payment verification
 */
export const verifyPayment = async (req, res) => {
	try {
		const { orderId, paymentId } = req.body;

		if (!orderId) {
			return res.status(400).json({ error: "Order ID is required" });
		}

		const order = await Order.findById(orderId).populate('user');
		if (!order) {
			return res.status(404).json({ error: "Order not found" });
		}

		if (order.orderStatus !== "pending") {
			return res.status(400).json({ error: `Order is already ${order.orderStatus}` });
		}

		// Update order status
		order.orderStatus = "processing";
		order.paymentId = paymentId || `PAY${Date.now()}`;
		order.paymentVerifiedAt = new Date();
		await order.save();

		// Deactivate coupon if used
		if (order.couponCode) {
			await Coupon.findOneAndUpdate(
				{
					code: order.couponCode,
					userId: order.user._id,
				},
				{
					isActive: false,
				}
			);
		}

		// Fetch product details for email
		const productDetails = await Promise.all(
			order.products.map(async (productItem) => {
				const productData = await Product.findById(productItem.product);
				return {
					name: productData?.name || "Product",
					image: productData?.coverImage || "",
					quantity: productItem.quantity,
					price: productItem.price,
					duration: productItem.duration,
				};
			})
		);

		// Send order confirmation email
		try {
			await transporter.sendMail({
				from: `"OTTMOMO" <${process.env.EMAIL_USER}>`,
				to: order.user.email,
				subject: `Order Confirmation - #${order._id.toString().slice(-8).toUpperCase()}`,
				template: "orderConfirmation",
				context: {
					customerName: order.user.name,
					orderId: order._id.toString().slice(-8).toUpperCase(),
					orderDate: new Date().toLocaleDateString("en-IN", {
						day: "numeric",
						month: "long",
						year: "numeric",
					}),
					paymentId: order.paymentId,
					products: productDetails,
					subtotal: order.totalAmount + (order.discountAmount || 0),
					discount: order.discountAmount > 0 ? order.discountAmount : null,
					totalAmount: order.totalAmount,
					frontendUrl: process.env.FRONTEND_URL,
				},
			});
			if (process.env.NODE_ENV === 'development') {
				console.log("Order confirmation email sent successfully");
			}
		} catch (emailError) {
			if (process.env.NODE_ENV === 'development') {
				console.error("Error sending order confirmation email:", emailError.message);
			}
		}

		res.status(200).json({
			success: true,
			message: "Payment verified and order confirmed",
			orderId: order._id,
		});
	} catch (error) {
		if (process.env.NODE_ENV === 'development') {
			console.error("Error verifying payment:", error);
		}
		res.status(500).json({ message: "Error verifying payment", error: error.message });
	}
};

/**
 * Legacy endpoint - kept for backward compatibility but now redirects to verifyPayment
 */
export const checkoutSuccess = async (req, res) => {
	return verifyPayment(req, res);
};

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 5,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
