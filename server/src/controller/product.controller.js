import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import { Product } from "../models/Product.model.js";

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find({}); 
		res.status(200).send({ products });
	} catch (error) {
		console.log("Error in getAllProducts controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const getAllCategories = async (req, res) => {
	try {
		// Get categories with the first product's cover image for each
		const categoriesWithImages = await Product.aggregate([
			// Sort by creation date to get consistent "first" product
			{ $sort: { createdAt: 1 } },
			// Group by category, take first product's coverImage
			{
				$group: {
					_id: '$category',
					coverImage: { $first: '$coverImage' },
					productName: { $first: '$name' }
				}
			},
			// Rename _id to name for cleaner response
			{
				$project: {
					_id: 0,
					name: '$_id',
					coverImage: 1,
					productName: 1
				}
			},
			// Sort alphabetically by category name
			{ $sort: { name: 1 } }
		]);
		
		res.status(200).send({ categories: categoriesWithImages });
	} catch (error) {
		console.log("Error in getAllCategories controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const getProductById = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		
		if (!product) {
			return res.status(404).send({ message: "Product not found" });
		}
		
		res.status(200).send(product);
	} catch (error) {
		console.log("Error in getProductById controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const getFeaturedProducts = async (req, res) => {
	try {
		let featuredProducts = await redis.get("featured_products");
        
		if (featuredProducts) {
			return res.json(JSON.parse(featuredProducts));
		}

		// if not in redis, fetch from mongodb
		// .lean() is gonna return a plain javascript object instead of a mongodb document
		// which is good for performance
		featuredProducts = await Product.find({ isFeatured: true }).lean();

		if (!featuredProducts) {
			return res.status(404).send({ message: "No featured products found" });
		}

		// store in redis for future quick access

		await redis.set("featured_products", JSON.stringify(featuredProducts));

		res.status(200).send(featuredProducts);
	} catch (error) {
		console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const createProduct = async (req, res) => {
	try {
		const { name, description, subscriptionPlans, coverImage, images, category, isAvailable, requiresGameId, requiresServerId, requiresAccountLink } = req.body;

		// Validate subscription plans
		if (!subscriptionPlans || !Array.isArray(subscriptionPlans) || subscriptionPlans.length === 0) {
			return res.status(400).json({ 
				message: "At least one subscription plan is required",
				example: {
					subscriptionPlans: [
						{ duration: "1 month", price: 99, stock: 10 },
						{ duration: "3 months", price: 249, stock: 10 },
						{ duration: "1 Month 2 Device", price: 199, stock: 5 }
					]
				}
			});
		}

		for (const plan of subscriptionPlans) {
			if (!plan.duration || typeof plan.duration !== 'string' || plan.duration.trim() === '') {
				return res.status(400).json({ 
					message: `Duration is required and must be a non-empty string` 
				});
			}
			if (plan.price === undefined || plan.price === null || plan.price < 0) {
				return res.status(400).json({ 
					message: `Invalid price for ${plan.duration}. Price must be a positive number` 
				});
			}
			if (plan.stock !== undefined && (plan.stock < 0 || !Number.isInteger(plan.stock))) {
				return res.status(400).json({ 
					message: `Invalid stock for ${plan.duration}. Stock must be a non-negative integer` 
				});
			}
		}

		let coverImageUrl = "";
		let additionalImagesUrls = [];

		// Upload cover image
		if (coverImage) {
			const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, { 
				folder: "OTTMOMO/products",
				transformation: [
					{ width: 1000, height: 1000, crop: "limit" },
					{ quality: "auto" },
					{ fetch_format: "auto" }
				]
			});
			coverImageUrl = cloudinaryResponse.secure_url;
		}

		// Upload additional images (if provided)
		if (images && Array.isArray(images) && images.length > 0) {
			const uploadPromises = images.map(img => 
				cloudinary.uploader.upload(img, { 
					folder: "OTTMOMO/products",
					transformation: [
						{ width: 1000, height: 1000, crop: "limit" },
						{ quality: "auto" },
						{ fetch_format: "auto" }
					]
				})
			);
			
			const uploadResults = await Promise.all(uploadPromises);
			additionalImagesUrls = uploadResults.map(result => result.secure_url);
		}

		const product = await Product.create({
			name,
			description,
			subscriptionPlans,
			coverImage: coverImageUrl,
			images: additionalImagesUrls,
			category,
			isAvailable: isAvailable !== undefined ? isAvailable : true,
			requiresGameId: requiresGameId || false,
			requiresServerId: requiresServerId || false,
			requiresAccountLink: requiresAccountLink || false,
		});

		res.status(201).json({
			success: true,
			message: "Product created successfully",
			product
		});
	} catch (error) {
		console.log("Error in createProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Delete cover image from cloudinary
		if (product.coverImage) {
			const publicId = product.coverImage.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`OTTMOMO/products/${publicId}`);
				console.log("Deleted cover image from cloudinary");
			} catch (error) {
				console.log("Error deleting cover image from cloudinary", error);
			}
		}

		// Delete additional images from cloudinary
		if (product.images && product.images.length > 0) {
			const deletePromises = product.images.map(async (imageUrl) => {
				const publicId = imageUrl.split("/").pop().split(".")[0];
				try {
					await cloudinary.uploader.destroy(`OTTMOMO/products/${publicId}`);
					console.log(`Deleted additional image from cloudinary: ${publicId}`);
				} catch (error) {
					console.log(`Error deleting image ${publicId}:`, error);
				}
			});
			
			await Promise.all(deletePromises);
		}

		await Product.findByIdAndDelete(req.params.id);

		res.status(200).json({ 
			success: true,
			message: "Product and all images deleted successfully" 
		});
	} catch (error) {
		console.log("Error in deleteProduct controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					coverImage: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const getProductsByCategory = async (req, res) => {
	const { category } = req.params;
	try {
		const products = await Product.find({ category });
		res.status(200).send({ products });
	} catch (error) {
		console.log("Error in getProductsByCategory controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

export const toggleFeaturedProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			product.isFeatured = !product.isFeatured;
			const updatedProduct = await product.save();
			await updateFeaturedProductsCache();
			res.status(200).send(updatedProduct);
		} else {
			res.status(404).send({ message: "Product not found" });
		}
	} catch (error) {
		console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).send({ message: "Server error", error: error.message });
	}
};

// Update product details
export const updateProduct = async (req, res) => {
	try {
		const { name, description, subscriptionPlans, category, isAvailable, requiresGameId, requiresServerId, requiresAccountLink } = req.body;
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Update basic fields
		if (name) product.name = name;
		if (description) product.description = description;
		if (category) product.category = category;
		if (isAvailable !== undefined) product.isAvailable = isAvailable;
		if (requiresGameId !== undefined) product.requiresGameId = requiresGameId;
		if (requiresServerId !== undefined) product.requiresServerId = requiresServerId;
		if (requiresAccountLink !== undefined) product.requiresAccountLink = requiresAccountLink;

		// Update subscription plans if provided
		if (subscriptionPlans && Array.isArray(subscriptionPlans)) {
			// Validate each plan - allow flexible duration strings
			for (const plan of subscriptionPlans) {
				if (!plan.duration || typeof plan.duration !== 'string' || plan.duration.trim() === '') {
					return res.status(400).json({ 
						message: `Duration is required and must be a non-empty string` 
					});
				}
				if (plan.price === undefined || plan.price === null || plan.price < 0) {
					return res.status(400).json({ 
						message: `Invalid price for ${plan.duration}. Price must be a positive number` 
					});
				}
				if (plan.stock !== undefined && (plan.stock < 0 || !Number.isInteger(plan.stock))) {
					return res.status(400).json({ 
						message: `Invalid stock for ${plan.duration}. Stock must be a non-negative integer` 
					});
				}
			}
			product.subscriptionPlans = subscriptionPlans;
		}

		const updatedProduct = await product.save();

		res.status(200).json({
			success: true,
			message: "Product updated successfully",
			product: updatedProduct
		});
	} catch (error) {
		console.log("Error in updateProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

// Note: Stock management removed for OTT subscriptions (digital products)

 
export const addProductImages = async (req, res) => {
	try {
		const { images } = req.body;  
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (!images || !Array.isArray(images) || images.length === 0) {
			return res.status(400).json({ message: "No images provided" });
		}

 		const totalImages = product.images.length + images.length;
		if (totalImages > 10) {
			return res.status(400).json({ 
				message: `Cannot add ${images.length} images. Maximum 10 images allowed. Current: ${product.images.length}` 
			});
		}

 		const uploadPromises = images.map(img => 
			cloudinary.uploader.upload(img, { 
				folder: "OTTMOMO/products",
				transformation: [
					{ width: 1000, height: 1000, crop: "limit" },
					{ quality: "auto" },
					{ fetch_format: "auto" }
				]
			})
		);

		const uploadResults = await Promise.all(uploadPromises);
		const newImageUrls = uploadResults.map(result => result.secure_url);

 		product.images.push(...newImageUrls);
		await product.save();

		res.status(200).json({
			success: true,
			message: `${newImageUrls.length} image(s) added successfully`,
			product: product
		});
	} catch (error) {
		console.log("Error in addProductImages controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

 export const removeProductImage = async (req, res) => {
	try {
		const { imageUrl } = req.body;
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (!imageUrl) {
			return res.status(400).json({ message: "Image URL is required" });
		}

 		const imageIndex = product.images.indexOf(imageUrl);
		if (imageIndex === -1) {
			return res.status(404).json({ message: "Image not found in product" });
		}

 		const publicId = imageUrl.split("/").pop().split(".")[0];
		try {
			await cloudinary.uploader.destroy(`OTTMOMO/products/${publicId}`);
			console.log(`Deleted image from cloudinary: ${publicId}`);
		} catch (error) {
			console.log("Error deleting image from cloudinary:", error);
		}

 		product.images.splice(imageIndex, 1);
		await product.save();

		res.status(200).json({
			success: true,
			message: "Image removed successfully",
			product: product
		});
	} catch (error) {
		console.log("Error in removeProductImage controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

 export const updateCoverImage = async (req, res) => {
	try {
		const { coverImage } = req.body; // base64 image
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (!coverImage) {
			return res.status(400).json({ message: "Cover image is required" });
		}

 		if (product.coverImage) {
			const oldPublicId = product.coverImage.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${oldPublicId}`);
				console.log("Deleted old cover image from cloudinary");
			} catch (error) {
				console.log("Error deleting old cover image:", error);
			}
		}

 		const cloudinaryResponse = await cloudinary.uploader.upload(coverImage, { 
			folder: "OTTMOMO/products",
			transformation: [
				{ width: 1000, height: 1000, crop: "limit" },
				{ quality: "auto" },
				{ fetch_format: "auto" }
			]
		});

		product.coverImage = cloudinaryResponse.secure_url;
		await product.save();

		res.status(200).json({
			success: true,
			message: "Cover image updated successfully",
			product: product
		});
	} catch (error) {
		console.log("Error in updateCoverImage controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

async function updateFeaturedProductsCache() {
	try {
		// The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}
