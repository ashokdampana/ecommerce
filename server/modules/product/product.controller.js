const asyncHandler = require('express-async-handler');
const sendError = require('../../utils/sendError.js');
const sendResponse = require('../../utils/sendResponse.js');
const productService = require('./product.service.js');
const redisClient = require('../../config/redis.js');

// 👉 Get Products
const getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const cacheKey = category ? `products:${category.toLowerCase()}` : 'products';

  // Check Redis cache first
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    const products = JSON.parse(cachedData);
    return sendResponse(res, 'Products retrieved (cache)', 200, products, 'products');
  }

  const result = await productService.getProducts(category);

  const products = result.map((p) => ({ ...p, image: process.env.AWS_BASE_URL+p.image }));
  // Store in Redis cache
  await redisClient.setEx(cacheKey, 3600, JSON.stringify(products)); // Cache for 1 hour
  sendResponse(res, 'Products retrieved', 200, products, 'products');
});

// 👉 Get Product By ID
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await productService.getProductById(id);
  if (!product) throw new sendError('Product Not Found', 404);

  const productURL = {
    ...product,
    image: product.image ? process.env.AWS_BASE_URL + product.image : '',
  };

  sendResponse(res, 'Product retrieved', 200, productURL, 'product');
});


// 👉 Create Product
const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description } = req.body;

  if (!name || !category || !price) {
    throw new sendError('Missing required fields', 400);
  }

  if (isNaN(price)) {
    throw new sendError('Price must be a number', 400);
  }

  const exists = await productService.getProductByName(name);
  if (exists) {
    throw new sendError('Product Already Exists', 400);
  }

  // Extract filename from S3 key
  const imageKey = req.file?.key ? req.file.key.split('/').pop() : null;

  const newProduct = await productService.createProduct({
    name,
    category: category.toLowerCase(),
    price: Number(price),
    description,
    image: imageKey,
  });

  const product = { ...newProduct, image: newProduct.image ? process.env.AWS_BASE_URL + newProduct.image : '' };

  sendResponse(res, 'Product Added', 201, product, 'product');
});


// 👉 Update Product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new sendError('Missing fields', 400);
  }

  if (updateData.price && isNaN(updateData.price)) {
    throw new sendError('Price must be a number', 400);
  }

  // Handle image update
  if (req.file?.key) {
    updateData.image = req.file.key.split('/').pop();
  }

  const updatedProduct = await productService.updateProduct(id, updateData);
  if (!updatedProduct) {
    throw new sendError('Product not found', 404);
  }

  const formattedProduct = {
    ...updatedProduct,
    image: updatedProduct.image ? getImageUrl(updatedProduct.image) : null,
  };

  sendResponse(res, 'Product Updated', 200, formattedProduct, 'product');
});


// 👉 Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await productService.deleteProduct(id);
  if (!deletedProduct) {
    throw new sendError('Product not found', 404);
  }

  sendResponse(res, 'Product Deleted', 200, deletedProduct, 'product');
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};