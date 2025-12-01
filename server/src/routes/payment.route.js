import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession, verifyPayment } from "../controller/payment.controller.js";
import { createXtraOrder, checkXtraOrderStatus } from "../controller/xtra.controller.js";

const payRouter = express.Router();

// User routes
payRouter.post("/create-checkout-session", protectRoute, createCheckoutSession);
payRouter.post("/checkout-success", protectRoute, checkoutSuccess);

// Admin route - verify payment manually
payRouter.post("/verify-payment", protectRoute, adminRoute, verifyPayment);

// XtraGate endpoints
payRouter.post('/xtragate/create', protectRoute, createXtraOrder);
// Remove auth requirement from status check since it only needs orderId/txnId
payRouter.post('/xtragate/check-status', checkXtraOrderStatus);

export default payRouter;