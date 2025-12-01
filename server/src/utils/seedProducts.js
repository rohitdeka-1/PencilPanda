import { connectDb } from "../database/db.js";
import { Product } from "../models/Product.model.js";
import dotenv from "dotenv";

dotenv.config();


const PLACEHOLDER = "https://via.placeholder.com/400x200.png?text=OTT+Product";

const ottProducts = [
  // ================= NETFLIX PREMIUM =================
  {
    name: "Netflix Premium",
    category: "Netflix",
    description: "Netflix Premium subscription plans with varying device limits",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 109 },
      { duration: "1 Month 2 Device", price: 219 },
      { duration: "2 Month 1 Device", price: 219 },
    ],
    isAvailable: true,
  },

  // ================= PRIME VIDEO SHARED =================
  {
    name: "Prime Video Shared Account",
    category: "Prime Video",
    description: "Amazon Prime Video shared account subscription",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 30 },
      { duration: "3 Month 1 Device", price: 119 },
      { duration: "6 Month 1 Device", price: 199 },
    ],
    isAvailable: true,
  },

  // ================= PRIME VIDEO PRIVATE =================
  {
    name: "Prime Video Private Full Account",
    category: "Prime Video",
    description: "Amazon Prime Video private full account with 5 devices",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "3 Month 5 Device", price: 199 },
      { duration: "6 Month 5 Device", price: 299 },
    ],
    isAvailable: true,
  },

  // ================= JIOHOTSTAR SHARED SUPER (WITH ADS) =================
  {
    name: "JioHotstar Shared (Super Plan - With Ads)",
    category: "JioHotstar",
    description: "JioHotstar shared account Super plan with advertisements",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 60 },
      { duration: "1 Month 2 Device", price: 99 },
      { duration: "3 Month 1 Device", price: 199 },
      { duration: "6 Month 1 Device", price: 299 },
      { duration: "12 Month 1 Device", price: 399 },
    ],
    isAvailable: true,
  },

  // ================= JIOHOTSTAR SHARED PREMIUM =================
  {
    name: "JioHotstar Shared (Premium Plan)",
    category: "JioHotstar",
    description: "JioHotstar shared account Premium plan without ads",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 109 },
      { duration: "1 Month 2 Device", price: 199 },
      { duration: "3 Month 1 Device", price: 299 },
      { duration: "6 Month 1 Device", price: 449 },
      { duration: "12 Month 1 Device", price: 549 },
    ],
    isAvailable: true,
  },

  // ================= JIOHOTSTAR PRIVATE =================
  {
    name: "JioHotstar Private Account (Phone Activation)",
    category: "JioHotstar",
    description: "Private JioHotstar account activated on your phone number",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 5 Device (Super - With Ads)", price: 80 },
      { duration: "1 Year 5 Device (Premium - No Ads)", price: 1349 },
    ],
    isAvailable: true,
  },

  // ================= SONY LIV SHARED =================
  {
    name: "SonyLIV Shared Account (OTP Login)",
    category: "SonyLIV",
    description: "SonyLIV shared account with OTP-based login",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 60 },
      { duration: "1 Month 2 Device", price: 109 },
      { duration: "3 Month 1 Device", price: 199 },
      { duration: "6 Month 1 Device", price: 249 },
      { duration: "12 Month 1 Device", price: 349 },
    ],
    isAvailable: true,
  },

  // ================= SONY LIV PRIVATE =================
  {
    name: "SonyLIV Private Account (Phone Activation)",
    category: "SonyLIV",
    description: "Private SonyLIV account activated on your phone number",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 5 Device", price: 90 },
      { duration: "6 Month 5 Device", price: 450 },
      { duration: "12 Month 5 Device", price: 650 },
    ],
    isAvailable: true,
  },

  // ================= ZEE5 PREMIUM =================
  {
    name: "ZEE5 Premium Private Account",
    category: "ZEE5",
    description: "ZEE5 Premium private account activated on your phone number",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Year", price: 250 },
    ],
    isAvailable: true,
  },

  // ================= HOICHOI PREMIUM =================
  {
    name: "Hoichoi Premium Private Account",
    category: "Hoichoi",
    description: "Hoichoi Premium private account activated on your phone number",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 5 Device", price: 80 },
    ],
    isAvailable: true,
  },

  // ================= SPOTIFY PREMIUM =================
  {
    name: "Spotify Premium",
    category: "Spotify",
    description: "Spotify Premium activation on your own email (Email ID & Password required)",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month", price: 119 },
    ],
    isAvailable: true,
  },

  // ================= SPOTIFY REDEEM CODE =================
  {
    name: "Spotify Premium Redeem Code",
    category: "Spotify",
    description: "Spotify Premium 2-month redeem code (Valid only for new accounts who never used Premium)",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "2 Month", price: 60 },
    ],
    isAvailable: true,
  },

  // ================= YOUTUBE PREMIUM NON-RENEWABLE =================
  {
    name: "YouTube Premium Non-Renewable",
    category: "YouTube",
    description: "YouTube Premium non-renewable plan for 1 month",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month", price: 35 },
    ],
    isAvailable: true,
  },

  // ================= YOUTUBE PREMIUM RENEWABLE =================
  {
    name: "YouTube Premium Renewable",
    category: "YouTube",
    description: "YouTube Premium renewable plan for 1 month",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month", price: 100 },
    ],
    isAvailable: true,
  },

  // ================= CRUNCHYROLL PREMIUM =================
  {
    name: "Crunchyroll Premium Shared Account",
    category: "Crunchyroll",
    description: "Crunchyroll Premium shared account subscription",
    coverImage: PLACEHOLDER,
    subscriptionPlans: [
      { duration: "1 Month 1 Device", price: 50 },
      { duration: "3 Month 1 Device", price: 120 },
      { duration: "6 Month 1 Device", price: 199 },
      { duration: "1 Year 1 Device", price: 249 },
    ],
    isAvailable: true,
  },
];


const seedProducts = async () => {
  try {
    await connectDb();

    // Clear existing products
    await Product.deleteMany({});
    console.log("✅ Cleared existing products\n");

    // Insert OTT products
    let count = 0;
    for (const prod of ottProducts) {
      await Product.create(prod);
      count++;
      console.log(`   ${count}. ${prod.name} - ₹${prod.subscriptionPlans[0].price}`);
    }

    console.log(`\n✅ Seeded ${count} OTT products successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedProducts();
