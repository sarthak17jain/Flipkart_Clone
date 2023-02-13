const express = require('express');
const { addItem, removeItem, updateQuantity, getCart } = require('../controller/cart-controller.js');

const cartRouter = express.Router();

cartRouter.post('/add', addItem);
cartRouter.post('/remove', removeItem);
cartRouter.post('/update', updateQuantity);
cartRouter.post('/getcart', getCart);

module.exports = cartRouter;