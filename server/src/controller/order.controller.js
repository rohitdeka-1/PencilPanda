import Order from "../models/Order.model.js";

// Get all orders for the logged-in user (last 15 days)
export const getUserOrders = async (req, res) => {
	try {
		const fifteenDaysAgo = new Date();
		fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

		const orders = await Order.find({ 
			user: req.user._id,
			createdAt: { $gte: fifteenDaysAgo }
		})
			.populate("products.product", "name coverImage subscriptionPlans")
			.sort({ createdAt: -1 });

		res.json(orders);
	} catch (error) {
		console.error("Error fetching orders:", error);
		res.status(500).json({ message: "Error fetching orders", error: error.message });
	}
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
	try {
		const { orderId } = req.params;

		const order = await Order.findOne({ _id: orderId, user: req.user._id })
			.populate("products.product", "name coverImage subscriptionPlans description");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.json(order);
	} catch (error) {
		console.error("Error fetching order:", error);
		res.status(500).json({ message: "Error fetching order", error: error.message });
	}
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.populate("products.product", "name coverImage subscriptionPlans")
			.sort({ createdAt: -1 });

		res.json(orders);
	} catch (error) {
		console.error("Error fetching all orders:", error);
		res.status(500).json({ message: "Error fetching orders", error: error.message });
	}
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { orderStatus } = req.body;

		const validStatuses = ["pending", "processing", "completed", "cancelled"];
		if (!validStatuses.includes(orderStatus)) {
			return res.status(400).json({ 
				message: "Invalid order status",
				validStatuses: validStatuses
			});
		}

		const order = await Order.findByIdAndUpdate(
			orderId,
			{ orderStatus },
			{ new: true }
		).populate("products.product", "name coverImage subscriptionPlans");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.json({
			message: "Order status updated successfully",
			order,
		});
	} catch (error) {
		console.error("Error updating order status:", error);
		res.status(500).json({ message: "Error updating order status", error: error.message });
	}
};

// Update delivery status (Admin only)
export const updateDeliveryStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { deliveryStatus } = req.body;

		const validStatuses = ["pending", "processing", "completed"];
		if (!validStatuses.includes(deliveryStatus)) {
			return res.status(400).json({ 
				message: "Invalid delivery status",
				validStatuses: validStatuses
			});
		}

		const order = await Order.findByIdAndUpdate(
			orderId,
			{ deliveryStatus },
			{ new: true }
		).populate("products.product", "name coverImage subscriptionPlans");

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		res.json({
			message: "Delivery status updated successfully",
			order,
		});
	} catch (error) {
		console.error("Error updating delivery status:", error);
		res.status(500).json({ message: "Error updating delivery status", error: error.message });
	}
};
