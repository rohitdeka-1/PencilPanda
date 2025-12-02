import { redis } from "../lib/redis.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/mailer.services.js";
import { getClientIp, parseUserAgent, getLocationFromIp, formatDate } from "../services/getIP.js";
import envConfig from "../config/env.config.js";
import { generateOTP, getOTPExpiry } from "../utils/otp.js";
import { logger } from "../utils/logger.js";
import axios from "axios";

const generateTokens = (userId) => {

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10d", // 1 day for better UX
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d", // 15 days
    });

    return { accessToken, refreshToken };
    
};

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 15 * 24 * 60 * 60); // 15 days
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
};

// Helper to send tokens in response body (fallback for blocked cookies)
const sendTokensInResponse = (res, accessToken, refreshToken, userData) => {
    // Set cookies for browsers that support them
    setCookies(res, accessToken, refreshToken);
    
    // Also send tokens in response body for fallback
    res.json({
        ...userData,
        tokens: {
            accessToken,
            refreshToken
        }
    });
};

export const signup = async (req, res) => {
    const { email, password, name,userPhone } = req.body;
    try {
        const userExists = await User.findOne({ email });

        // If user exists and is already verified, return error
        if (userExists && userExists.isVerified) {
            return res.status(400).json({ message: "User already exists. Please login instead." });
        }

        if (userExists && !userExists.isVerified) {
            
            const otp = generateOTP();
            const otpExpires = getOTPExpiry();

            userExists.name = name;
            userExists.password = password; // Will be hashed by pre-save middleware
            userExists.verificationOTP = otp;
            userExists.userPhone = userPhone;
            userExists.otpExpires = otpExpires;
            await userExists.save();

            
            try {
                sendMail(
                    userExists.email,
                    "Verify Your Email - New OTP Code",
                    "otp",
                    {
                        name: userExists.name,
                        otp: otp,
                        expiryMinutes: 15,
                        year: new Date().getFullYear()
                    }
                );
                logger.secure("New OTP email sent to existing unverified user");
            } catch (emailError) {
                logger.error("Failed to send OTP email", emailError);
                return res.status(500).json({ message: "Failed to send verification email. Please try again." });
            }

            return res.status(200).json({
                message: "You have an unverified account. A new OTP has been sent to your email.",
                email: userExists.email
            });
        }

         
        const otp = generateOTP();
        const otpExpires = getOTPExpiry();

        const user = await User.create({ 
            name, 
            email, 
            userPhone,
            password,
            isVerified: false,
            verificationOTP: otp,
            otpExpires: otpExpires
        });

        try {
            sendMail(
                user.email,
                "Verify Your Email - OTP Code",
                "otp",
                {
                    name: user.name,
                    otp: otp,
                    expiryMinutes: 15,
                    year: new Date().getFullYear()
                }
            );
            logger.secure("OTP email sent successfully");
        } catch (emailError) {
            logger.error("Failed to send OTP email", emailError);
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }

        res.status(201).json({
            message: "OTP sent to your email. Please verify to complete registration.",
            email: user.email
        });
    } catch (error) {
        logger.error("Error in signup controller", error);
        res.status(500).json({ message: "Registration failed. Please try again." });
    }
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        // Check if OTP matches
        if (user.verificationOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        user.isVerified = true;
        user.verificationOTP = undefined;
        user.otpExpires = undefined;
        await user.save();

        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        // Send welcome email
        try {
            sendMail(
                user.email,
                "Welcome to Pencil Panda - Your Account is Ready! 🐼✏️",
                "welcome",
                {
                    name: user.name,
                    email: user.email,
                    registrationDate: formatDate(),
                    role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                    frontendUrl: envConfig.FRONT_END || "http://localhost:5173",
                    year: new Date().getFullYear()
                }
            );
            logger.success("Welcome email sent successfully");
        } catch (emailError) {
            logger.error("Failed to send welcome email", emailError);
        }

        sendTokensInResponse(res, accessToken, refreshToken, {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "Email verified successfully! Welcome aboard!"
        });
    } catch (error) {
        logger.error("Error in verifyOTP controller", error);
        res.status(500).json({ message: "Verification failed. Please try again." });
    }
};

export const resendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: "User is already verified" });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otpExpires = getOTPExpiry();

        user.verificationOTP = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP email
        try {
            sendMail(
                user.email,
                "Verify Your Email - New OTP Code",
                "otp",
                {
                    name: user.name,
                    otp: otp,
                    expiryMinutes: 15,
                    year: new Date().getFullYear()
                }
            );
            logger.success("New OTP email sent successfully");
        } catch (emailError) {
            logger.error("Failed to send OTP email", emailError);
            return res.status(500).json({ message: "Failed to send verification email. Please try again." });
        }

        res.status(200).json({
            message: "New OTP sent to your email",
            email: user.email
        });
    } catch (error) {
        logger.error("Error in resendOTP controller", error);
        res.status(500).json({ message: "Failed to resend OTP. Please try again." });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            // Check if user is verified
            if (!user.isVerified) {
                return res.status(403).json({ 
                    message: "You had not verified with OTP, please signup again.",
                    requiresVerification: true
                });
            }

            const { accessToken, refreshToken } = generateTokens(user._id);
            await storeRefreshToken(user._id, refreshToken);

            const ipAddress = getClientIp(req);
            const userAgent = req.headers['user-agent'] || '';
            const { browser, os, deviceInfo } = parseUserAgent(userAgent);
            const location = getLocationFromIp(ipAddress);

            
            try {
                sendMail(
                    user.email,
                    "🔐 New Login Alert - Pencil Panda Account",
                    "login",
                    {
                        name: user.name,
                        email: user.email,
                        loginTime: formatDate(),
                        ipAddress: ipAddress,
                        deviceInfo: deviceInfo,
                        browser: browser,
                        os: os,
                        location: location,
                        frontendUrl: envConfig.FRONT_END || "http://localhost:5173",
                        year: new Date().getFullYear()
                    }
                );
            } catch (emailError) {
                console.error("Failed to send login notification:", emailError.message);
            }

            sendTokensInResponse(res, accessToken, refreshToken, {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                message: "Login successful"
            });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken"); 
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        // Try cookies first, then request body (fallback for blocked cookies)
        let refreshToken = req.cookies?.refreshToken;
        
        if (!refreshToken && req.body?.refreshToken) {
            refreshToken = req.body.refreshToken;
        }

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

        if (storedToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        // Also send token in response body for fallback
        res.json({ 
            message: "Token refreshed successfully",
            accessToken 
        });
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, userPhone } = req.body;
        const userId = req.user._id;

        const updateData = {};
        if (name) updateData.name = name;
        if (userPhone) updateData.userPhone = userPhone;

        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ 
            message: "Profile updated successfully",
            user 
        });
    } catch (error) {
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Please provide current and new password" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(currentPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });
    } catch (error) {
        console.log("Error in changePassword controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please provide your email address" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email address" });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: "Please verify your email first before resetting password" });
        }

        // Generate OTP for password reset
        const otp = generateOTP();
        const otpExpires = getOTPExpiry();

        user.verificationOTP = otp;
        user.otpExpires = otpExpires;
        await user.save();

        // Send OTP email
        try {
            sendMail(
                user.email,
                "Reset Your Password - OTP Code",
                "forgot-password",
                {
                    name: user.name,
                    otp: otp,
                    expiryMinutes: 15,
                    year: new Date().getFullYear()
                }
            );
            logger.secure("Password reset OTP sent");
        } catch (emailError) {
            logger.error("Failed to send password reset email", emailError);
            return res.status(500).json({ message: "Failed to send password reset email. Please try again." });
        }

        res.status(200).json({
            message: "Password reset OTP sent to your email",
            email: user.email
        });
    } catch (error) {
        logger.error("Error in forgotPassword controller", error);
        res.status(500).json({ message: "Failed to process password reset request." });
    }
};

export const verifyResetOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Please provide email and OTP" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        res.status(200).json({
            message: "OTP verified successfully. You can now reset your password.",
            email: user.email
        });
    } catch (error) {
        logger.error("Error in verifyResetOTP controller", error);
        res.status(500).json({ message: "OTP verification failed." });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "Please provide email, OTP, and new password" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verificationOTP !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // Reset password and clear OTP
        user.password = newPassword;
        user.verificationOTP = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Send confirmation email
        try {
            sendMail(
                user.email,
                "Password Reset Successful",
                "password-reset-success",
                {
                    name: user.name,
                    resetTime: formatDate(),
                    frontendUrl: envConfig.FRONT_END || "http://localhost:5173",
                    year: new Date().getFullYear()
                }
            );
            logger.success("Password reset confirmation sent");
        } catch (emailError) {
            logger.error("Failed to send confirmation email", emailError);
        }

        res.status(200).json({
            message: "Password reset successfully. You can now login with your new password."
        });
    } catch (error) {
        logger.error("Error in resetPassword controller", error);
        res.status(500).json({ message: "Password reset failed. Please try again." });
    }
};

// Google OAuth Controllers
export const googleAuth = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "No credential provided" });
        }

        // Verify Google token
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`
        );

        const { email, name, picture, sub: googleId } = response.data;

        if (!email) {
            return res.status(400).json({ message: "Unable to retrieve email from Google" });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // User exists - check if it's a Google account or needs linking
            if (user.authProvider === "local" && !user.googleId) {
                // Link Google to existing local account
                user.googleId = googleId;
                user.authProvider = "google";
                user.profilePicture = picture;
                user.isVerified = true;
                await user.save();
                logger.info(`Linked Google account to existing user: ${email}`);
            } else if (user.googleId !== googleId) {
                return res.status(400).json({ 
                    message: "Email already registered with different authentication method" 
                });
            }
        } else {
            // Create new user with Google account
            user = await User.create({
                name,
                email,
                googleId,
                authProvider: "google",
                profilePicture: picture,
                isVerified: true,
                // Phone not required for Google users
                userPhone: ""
            });

            // Send welcome email
            try {
                sendMail(
                    user.email,
                    "Welcome to Pencil Panda - Your Account is Ready! 🐼✏️",
                    "welcome",
                    {
                        name: user.name,
                        email: user.email,
                        registrationDate: formatDate(),
                        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
                        frontendUrl: envConfig.FRONT_END || "http://localhost:5173",
                        year: new Date().getFullYear()
                    }
                );
                logger.success("Welcome email sent to Google user");
            } catch (emailError) {
                logger.error("Failed to send welcome email", emailError);
            }
        }

        // Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        // Send login notification
        const ipAddress = getClientIp(req);
        const userAgent = req.headers['user-agent'] || '';
        const { browser, os, deviceInfo } = parseUserAgent(userAgent);
        const location = getLocationFromIp(ipAddress);

        try {
            sendMail(
                user.email,
                "🔐 New Login Alert - Pencil Panda Account",
                "login",
                {
                    name: user.name,
                    email: user.email,
                    loginTime: formatDate(),
                    ipAddress: ipAddress,
                    deviceInfo: deviceInfo,
                    browser: browser,
                    os: os,
                    location: location,
                    frontendUrl: envConfig.FRONT_END || "http://localhost:5173",
                    year: new Date().getFullYear()
                }
            );
        } catch (emailError) {
            logger.error("Failed to send login notification:", emailError);
        }

        sendTokensInResponse(res, accessToken, refreshToken, {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            message: "Google authentication successful"
        });
    } catch (error) {
        logger.error("Error in Google auth controller", error);
        if (error.response) {
            return res.status(400).json({ 
                message: "Invalid Google credential",
                error: error.response.data 
            });
        }
        res.status(500).json({ message: "Google authentication failed. Please try again." });
    }
};