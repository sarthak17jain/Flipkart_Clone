const express = require('express');
const productRouter = require('./productRouter.js');
const cartRouter = require('./cartRouter.js');
const authRouter = require('./authRouter.js');
const paymentRouter = require('./paymentRouter.js');

const routes = express.Router();

routes.use('/productData', productRouter);
routes.use('/auth', authRouter);
routes.use('/payment', paymentRouter);
routes.use('/cart', cartRouter);

module.exports = routes;