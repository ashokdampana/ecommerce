const asyncHandler = require('express-async-handler');
const sendError = require('../../utils/sendError.js');
const sendResponse = require('../../utils/sendResponse.js');
const productService = require('./product.service.js');

exports.getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const result = await productService.getProducts(category);

  sendResponse(res, 'Products retrieved successfully', 200, result, 'data');
});

exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  if (!product) throw new sendError('Product Not Found', 404);

  sendResponse(res, 'Product retrieved successfully', 200, product, 'product');
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description, image } = req.body;

  if (!name || !category || !price) {
    throw new sendError('Missing required fields', 400);
  }

  if (await productService.getProductByName(name)) {
    throw new sendError('Product Already Exists', 400);
  }

  const newProduct = await productService.createProduct({
    name,
    category: category.toLowerCase(),
    price,
    description,
    image
  });

  sendResponse(res, 'Product Added', 201, newProduct, 'product');
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new sendError('Missing fields', 400);
  }

  const updatedProduct = await productService.updateProduct(id, updateData);
  if (!updatedProduct) throw new sendError('Product not found', 404);

  sendResponse(res, 'Product Updated', 200, updatedProduct, 'product');
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productService.deleteProduct(id);
  if (!deletedProduct) throw new sendError('Product not found', 404);

  sendResponse(res, 'Product Deleted', 200, deletedProduct, 'product');
});

