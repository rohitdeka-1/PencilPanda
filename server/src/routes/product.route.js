import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { 
	createProduct, 
	deleteProduct, 
	getAllProducts,
	getAllCategories,
	getProductById,
	getFeaturedProducts, 
	getProductsByCategory, 
	getRecommendedProducts, 
	toggleFeaturedProduct,
	updateProduct,
	addProductImages,
	removeProductImage,
	updateCoverImage
} from "../controller/product.controller.js";

const prodRoute = express.Router();

prodRoute.get("/", getAllProducts);
prodRoute.get("/categories", getAllCategories);
prodRoute.get("/featured", getFeaturedProducts);
prodRoute.get("/category/:category", getProductsByCategory);
prodRoute.get("/recommendations", getRecommendedProducts);
prodRoute.get("/:id", getProductById);

prodRoute.post("/", protectRoute, adminRoute, createProduct);
prodRoute.patch("/:id", protectRoute, adminRoute, updateProduct);
prodRoute.delete("/:id", protectRoute, adminRoute, deleteProduct);
prodRoute.patch("/:id/featured", protectRoute, adminRoute, toggleFeaturedProduct);

prodRoute.post("/:id/images", protectRoute, adminRoute, addProductImages);
prodRoute.delete("/:id/images", protectRoute, adminRoute, removeProductImage);
prodRoute.patch("/:id/cover-image", protectRoute, adminRoute, updateCoverImage);

export default prodRoute;