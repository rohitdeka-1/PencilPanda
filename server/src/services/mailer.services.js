import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from 'url';
import envConfig from "../config/env.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: envConfig.GOOGLE_APP_GMAIL,
        pass: envConfig.GOOGLE_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000
});


transporter.verify(function (error, success) {
    if (error) {
        console.error("❌ Email service error:", error.message);
        console.log("📧 Email notifications may not work properly");
    } else {
        console.log("✅ Email service is ready");
    }
});



export const sendMail = async (to, subject, template, context = {}) => {
    // Path to logo
    const logoPath = path.join(__dirname, '../public/logo1.png');

    try {
        const info = await transporter.sendMail(
            {
                from: {
                    name: 'OTTHUB',
                    address: envConfig.GOOGLE_APP_GMAIL
                },
                to,
                subject,
                template,
                context,
                attachments: [
                    {
                        filename: 'logo1.png',
                        path: logoPath,
                        cid: 'logo'
                    }
                ]
            }
        );
        console.log('✅ Email sent to:', to);
        return info;
    } catch (error) {
        console.error('❌ Email failed:', error.message);
        throw error;
    }
}

// Send order success email
export const sendOrderSuccessEmail = (order, user) => {
    try {
        const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const products = order.products.map(item => ({
            name: item.product?.name || 'Product',
            duration: item.duration,
            quantity: item.quantity,
            price: item.price
        }));

        const context = {
            customerName: user.name,
            orderId: order._id.toString().slice(-8).toUpperCase(),
            transactionId: order.transactionId,
            orderDate: orderDate,
            products: products,
            totalAmount: order.totalAmount,
            frontendUrl: envConfig.FRONT_END || 'http://localhost:5173',
            year: new Date().getFullYear()
        };
        
        sendMail(
            user.email,
            'Order Placed Successfully - OTTHUB',
            'orderSuccess',
            context
        ).catch((error) => {
            console.error('❌ Order email failed:', error.message);
        });

        // Send admin notification
        sendAdminOrderNotification(order, user);

    } catch (error) {
        console.error('❌ sendOrderSuccessEmail error:', error.message);
    }
}

// Send admin notification email
export const sendAdminOrderNotification = (order, user) => {
    try {
        const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const context = {
            customerName: user.name,
            customerEmail: user.email,
            customerWhatsapp: order.customerWhatsapp || null,
            orderId: order._id.toString().slice(-8).toUpperCase(),
            transactionId: order.transactionId,
            orderDate: orderDate,
            totalAmount: order.totalAmount,
            year: new Date().getFullYear()
        };

        sendMail(
            'momomaynglmbm@gmail.com',
            '🔔 New Order Payment Received - OTTHUB',
            'adminOrderNotification',
            context
        ).catch((error) => {
            console.error('❌ Admin notification failed:', error.message);
        });

    } catch (error) {
        console.error('❌ sendAdminOrderNotification error:', error.message);
    }
}


