import express from 'express';
import { addItem, removeItem, updateQuantity, getCart } from '../controller/cart-controller.js';

const cartRouter = express.Router();

cartRouter.post('/add', addItem);
cartRouter.post('/remove', removeItem);
cartRouter.post('/update', updateQuantity);
cartRouter.post('/getcart', getCart);

export default cartRouter;