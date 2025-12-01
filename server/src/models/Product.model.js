import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema({
    duration: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    subscriptionPlans: {
        type: [subscriptionPlanSchema],
        required: true,
        validate: {
            validator: function(plans) {
                return plans.length > 0;
            },
            message: "At least one subscription plan is required"
        }
    },
    // Legacy price field for backward compatibility (will use first plan's price)
    price: {
        type: Number,
        min: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    coverImage: {
        type: String,
        required: [true, "Cover image is required"],
    },
    images: {
        type: [String],
        default: [],
        validate: {
            validator: function(images) {
                return images.length <= 10; // Max 10 images
            },
            message: "Cannot upload more than 10 images"
        }
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    requiresGameId: {
        type: Boolean,
        default: false,
    },
    requiresServerId: {
        type: Boolean,
        default: false,
    },
    requiresAccountLink: {
        type: Boolean,
        default: false,
    },
    soldCount: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true,
});

// Pre-save hook to set legacy price from first subscription plan
productSchema.pre('save', function(next) {
    if (this.subscriptionPlans && this.subscriptionPlans.length > 0 && !this.price) {
        this.price = this.subscriptionPlans[0].price;
    }
    next();
});

// Method to get price for a specific duration
productSchema.methods.getPriceForDuration = function(duration) {
    const plan = this.subscriptionPlans.find(p => p.duration === duration);
    return plan ? plan.price : null;
};

export const Product = mongoose.model("Product", productSchema);