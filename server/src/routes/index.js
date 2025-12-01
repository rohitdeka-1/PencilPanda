import { Router } from "express";
import { transporter } from "../services/mailer.services.js";
import path from "path";
import hbs from "nodemailer-express-handlebars"
import authRoutes from "./auth.route.js";
import prodRoute from "./product.route.js";
import cartRoute from "./cart.route.js";
import couponRoute from "./coupon.route.js";
import payRouter from "./payment.route.js";
import orderRouter from "./order.route.js";
import analyticsRouter from "./analytics.route.js";

const router = Router();

router.use("/auth",authRoutes);
router.use("/product",prodRoute);
router.use("/cart",cartRoute);
router.use("/payment", payRouter);
router.use("/coupon", couponRoute);
router.use("/orders", orderRouter);
router.use("/analytics", analyticsRouter);



//handlebars
const hbsOptions = {
    viewEngine: {
        defaultLayout: false,
        partialsDir: path.resolve("src/Email/partials"), // Fixed: must be a string, not false
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    },
    viewPath: path.resolve("src/Email"),
    extName: '.handlebars'
}

transporter.use('compile', hbs(hbsOptions))


export default router



