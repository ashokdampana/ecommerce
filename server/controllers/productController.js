const asyncHandler = require('express-async-handler');
const Product = require('../models/Product.js');
const AppError = require('../utils/AppError.js');
const redisClient = require('../config/redisClient.js');

exports.getProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  const cacheKey = category ? `products:${category}` : 'products:all';
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log('Cache hit products')
    return res.status(200).json({ products: JSON.parse(cached), cached: true });
  }
  const products = await Product.find(category ? { category: category } : {}).lean();
  await redisClient.setEx(cacheKey, 300, JSON.stringify(products));

  res.status(200).json({ products, cached: false });
});


exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).lean();
  if (!product) throw new AppError('Product Not Found', 404);
  res.status(200).json({ product: {_id: product._id, name: product.name, image: product.image, price: product.price } });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, description, image } = req.body;
  if (!name || !category || !price) throw new AppError('Missing required fields', 400);

  if (await Product.findOne({ name })) throw new AppError('Product Already Exists', 400);
  
  const newProduct = await Product.create({ name, category: category.toLowerCase(), price, description, image });

  await redisClient.del('products:all');
  res.status(201).json({ success: true, message: 'Product Added', product: newProduct });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  if ( !req.body) {
    throw new AppError('Missing fields', 400);
  }
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(id, { ...req.body}, {new: true, runValidators: true});
  if ( !updatedProduct) {
    throw new AppError('Something went wrong. Try later...');
  }
  await redisClient.del('products:all');
  res.status(200).json({success: true, message: 'Product Updated', product: updatedProduct});
})

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findOneAndDelete(id);
  if ( !deletedProduct) {
    throw new AppError('Something went wrong. Try later...');
  }
  await redisClient.del('products:all');
  res.status(200).json({success: true, message: 'Product Deleted', product: deletedProduct});
})

