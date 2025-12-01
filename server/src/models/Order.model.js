import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, // Made optional for guest checkout or when auth fails
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            duration: {
                type: String,
                required: true,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending",
    },
    // Delivery status - separate from payment status
    deliveryStatus: {
        type: String,
        enum: ["pending", "processing", "completed"],
        default: "pending",
    },
    // QR Code payment fields
    qrCode: {
        type: String, // Base64 encoded QR code image
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentId: {
        type: String,
    },
    paymentVerifiedAt: {
        type: Date,
    },
    // XtraGate payment details
    payment_details: {
        type: mongoose.Schema.Types.Mixed,
    },
    // Coupon fields
    couponCode: {
        type: String,
    },
    discountAmount: {
        type: Number,
        default: 0,
        min: 0,
    },
    // Customer contact details
    customerWhatsapp: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    // Game ID for games like Roblox, PUBG
    customerGameId: {
        type: String,
    },
    // Server ID for games that require it
    customerServerId: {
        type: String,
    },
    // Account Link for social media products
    customerAccountLink: {
        type: String,
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
