import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';

const productRouter = express.Router();

productRouter.get('/allproducts', getProducts);
productRouter.get('/:id', getProductById);

export default productRouter;