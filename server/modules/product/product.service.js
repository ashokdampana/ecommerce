const Product = require('./product.model.js');

const getProducts = async (category) => {
  const products = await Product.find(category ? { category } : {}).lean();
  return { products, cached: false };
};

const getProductById = async (id) => {
  return await Product.findById(id).lean();
};

const getProductByName = async (name) => {
  return await Product.findOne({ name }).lean();
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const updateProduct = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  createProduct,
  updateProduct,
  deleteProduct
};

