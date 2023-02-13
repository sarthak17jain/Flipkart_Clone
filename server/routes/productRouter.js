const express = require('express');
const { getProductById, getProducts } = require('../controller/product-controller.js');

const productRouter = express.Router();

productRouter.get('/allproducts', getProducts);
productRouter.get('/:id', getProductById);

module.exports = productRouter;