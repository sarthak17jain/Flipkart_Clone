import express from 'express';
import { checkout, clearCart } from '../controller/payment-controller.js';
// import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';

const paymentRouter = express.Router();

paymentRouter.route("/checkout").post(checkout);
paymentRouter.route("/webhook").post(clearCart);

// paymentRouter.post('/addpg', addPaymentGateway);
// paymentRouter.post('/callback', paymentResponse);

export default paymentRouter;