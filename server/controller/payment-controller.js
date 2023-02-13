const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// import bodyparser from 'body-parser';
const dotenv = require('dotenv').config();
// dotenv.config();
const cartModel  = require('../model/cartSchema.js');

const checkout = async function (req, res){
    console.log("server side checkout called");
    try {
        const {email, items, isCartPayment} = req.body;
        // console.log(items);
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ["card"],
            customer_email: email,
            metadata: {"cart_payment": isCartPayment},
            mode: "payment",
            line_items: items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.title.longTitle,
                            // description: item.description,
                            images: [item.url],
                        },
                        unit_amount: item.price.cost*100,
                    },
                    quantity: item.quantity,
                }
            }),
            shipping_options: [
                {
                  shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 40*100, currency: 'inr'},
                    display_name: 'Standard Delivery',
                    delivery_estimate: {
                      minimum: {unit: 'business_day', value: 2},
                      maximum: {unit: 'business_day', value: 3},
                    },
                  },
                },
            ],
            // dev => http
            // production => https
            // success_url: `${req.protocol}://${req.get("host")}`,
            // cancel_url: `${req.protocol}://${req.get("host")}`,
            success_url: `${process.env.CLIENT_URL}${process.env.PAYMENT_SUCCESS_PATH}`,
            cancel_url: `${process.env.CLIENT_URL}${process.env.PAYMENT_FAILURE_PATH}`,
        });

        // console.log(session);
        // console.log("Session ID: "+session.id);
        res.status(200).json({
            status: "success",
            url: session.url,
        });
    } catch (err) {
        res.status(500).json({
            err: err.message,
        });
    }
};

const clearCart = async function (req, res){
    console.log("server side clearcart called");
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    let event = req.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers['stripe-signature'];
      console.log(signature);
      console.log(req.rawBody);
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400).json({
            data:{
                message: "payment failed"
            }
        });
      }
    }
    console.log(event.type);
    // console.log(req.body);
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntentID = event.data.object.id;
            console.log(`Payment was successful!`);
            console.log(paymentIntentID);
            try{
                const sessionList = await stripe.checkout.sessions.list({payment_intent: paymentIntentID});
                const session = sessionList.data[0];
                // console.log(session);
                const metadata = session.metadata;
                if(metadata.cart_payment == "true"){
                    console.log("cart payment: true");
                    const cartDoc = await cartModel.findOne({email: session.customer_email});
                    cartDoc.cartItems = [];
                    // console.log(cartDoc);
                    await cartDoc.save();
                }else{
                    console.log("cart payment: false");
                }
            }catch(err){

            }
            // console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        }
        case 'payment_intent.payment_failed':{
            const paymentMethod = event.data.object;
            console.log(`Payment failed`);
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        }
        default:{
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
        }
    }   
    res.send();
}

module.exports = {checkout, clearCart};

//PAYTM:
// import paytmchecksum from '../paytm/PaytmChecksum.js';
// import { paytmParams, paytmMerchantkey } from '../index.js';
// import formidable from 'formidable';
// import https from 'https';

// export const addPaymentGateway = async (request, response) => {
//     paytmParams.TXN_AMOUNT = request.body.amount.toString();
//     paytmParams.EMAIL = request.body.email;
//     let paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
//     try {
//         let params = {
//             ...paytmParams,
//             'CHECKSUMHASH': paytmCheckSum
//         };
//         console.log("addPaymentGateway success");
//         response.status(200).json(params);
//     } catch (error) {
//         console.log("addPaymentGateway failure");
//         response.status(500).json({message: error.message});
//         console.log(error);
//     }
// }

// export const paymentResponse = (request, response) => {
//     try{
//         const form = new formidable.IncomingForm();
//         let paytmCheckSum = request.body.CHECKSUMHASH;
//         delete request.body.CHECKSUMHASH;

//         var isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
//         console.log(isVerifySignature);
//         if (isVerifySignature) {
//             var paytmParams = {};
//             paytmParams["MID"] = request.body.MID;
//             paytmParams["ORDERID"] = request.body.ORDERID;

//             paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

//                 paytmParams["CHECKSUMHASH"] = checksum;

//                 var post_data = JSON.stringify(paytmParams);

//                 var options = {

//                     hostname: 'securegw-stage.paytm.in',
//                     port: 443,
//                     path: '/order/status',
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Content-Length': post_data.length
//                     }
//                 };

//                 var res = "";
//                 var post_req = https.request(options, function (post_res) {
//                     post_res.on('data', function (chunk) {
//                         res += chunk;
//                     });

//                     post_res.on('end', function () {
//                         let result = JSON.parse(res)
//                         response.status(200).json({message: "payment successful"});
//                         // window.close();
//                     });
//                 });
//                 post_req.write(post_data);
//                 post_req.end();
//             });
//         } else {
//             console.log("Checksum Mismatched");
//             response.status(500).json({message: "Checksum Mismatched"});
//         }
//         console.log('//////////////end');
//     }catch(err){
//         response.status(500).json({message: err.message});
//     }
// }