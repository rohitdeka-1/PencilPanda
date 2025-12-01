import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: function() {
                // Password is required only for non-Google auth users
                return !this.googleId;
            },
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true, // Allows null values while maintaining uniqueness for non-null values
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        profilePicture: {
            type: String,
        },
        cartItems: [
            {
                quantity: {
                    type: Number,
                    default: 1,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                }
            }
        ],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        userPhone: {
            type: String,
            required: function() {
                // Phone is required only for local auth users
                return this.authProvider === "local";
            },
        },
        isVerified: {
            type: Boolean,
            default: function() {
                // Google users are automatically verified
                return this.authProvider === "google";
            },
        },
        verificationOTP: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
        addresses: [
            {
                fullName: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: String,
                    required: true,
                },
                addressLine1: {
                    type: String,
                    required: true,
                },
                addressLine2: {
                    type: String,
                },
                city: {
                    type: String,
                    required: true,
                },
                state: {
                    type: String,
                    required: true,
                },
                pincode: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                    default: "India",
                },
                isDefault: {
                    type: Boolean,
                    default: false,
                }
            }
        ],
        billingAddresses: [
            {
                fullName: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: String,
                    required: true,
                },
                addressLine1: {
                    type: String,
                    required: true,
                },
                addressLine2: {
                    type: String,
                },
                city: {
                    type: String,
                    required: true,
                },
                state: {
                    type: String,
                    required: true,
                },
                pincode: {
                    type: String,
                    required: true,
                },
                country: {
                    type: String,
                    required: true,
                    default: "India",
                },
                isDefault: {
                    type: Boolean,
                    default: false,
                }
            }
        ]
    },
    {
        timestamps: true,

    }
)
// Hashing 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}


export const User = mongoose.model("User", userSchema);
