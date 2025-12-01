import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import {
	getUserOrders,
	getOrderById,
	getAllOrders,
	updateOrderStatus,
	updateDeliveryStatus,
} from "../controller/order.controller.js";

const orderRouter = express.Router();

// User routes
orderRouter.get("/", protectRoute, getUserOrders);
orderRouter.get("/:orderId", protectRoute, getOrderById);

// Admin routes
orderRouter.get("/admin/all", protectRoute, adminRoute, getAllOrders);
orderRouter.patch("/:orderId/status", protectRoute, adminRoute, updateOrderStatus);
orderRouter.patch("/:orderId/delivery", protectRoute, adminRoute, updateDeliveryStatus);

export default orderRouter;
