const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const { upload } = require('../../config/uploadImage');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.single('image'), productController.createProduct);
router.patch('/:id', upload.single('image'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
