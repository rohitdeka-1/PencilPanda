import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import rateLimit from "express-rate-limit"; // Disabled for development
import hpp from "hpp";
import router from "./routes/index.js";
import { connectDb } from "./database/db.js";
import envConfig from './config/env.config.js';
import { startCleanupJob } from './jobs/cleanupUnverified.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy - Required for Heroku/behind reverse proxy
app.set('trust proxy', 1);

// Security Middleware - Helmet for security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false,
}));

// Rate limiting - DISABLED FOR DEVELOPMENT
// const globalLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per windowMs
//     message: "Too many requests from this IP, please try again later.",
//     standardHeaders: true,
//     legacyHeaders: false,
// });

// Rate limiting - Auth routes (stricter)
// const authLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 5, // Limit each IP to 5 login attempts per windowMs
//     message: "Too many login attempts, please try again after 15 minutes.",
//     skipSuccessfulRequests: true,
// });

// Rate limiting - OTP routes (very strict)
// const otpLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 3, // Only 3 OTP attempts
//     message: "Too many OTP attempts, please try again after 15 minutes.",
// });

// Apply global rate limiter - DISABLED FOR DEVELOPMENT
// app.use(globalLimiter);

// CORS Configuration - Must be BEFORE body parsers
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "http://localhost:5173",
        ];
        
        // Allow listed origins
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        
        // For development, allow all localhost origins
        if (process.env.NODE_ENV === 'development' || origin?.includes('localhost') || origin?.includes('127.0.0.1')) {
            return callback(null, true);
        }
        
        // Allow by default for now (you can restrict this later)
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['set-cookie'],
}));

// Body parser with size limits - Increased for image uploads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use(cookieParser());

// Store rate limiters for use in routes - DISABLED FOR DEVELOPMENT
// app.set('authLimiter', authLimiter);
// app.set('otpLimiter', otpLimiter);

app.get("/health-check", (req, res) => {
    res.send("ottmomo Backend Server - Running");
});

// Routes
app.use("/api/v1", router);



connectDb().then(() => {
    // Start cleanup job after database connection
    startCleanupJob();
    
    app.listen(PORT, () => {
        console.log(`Server running : http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
});