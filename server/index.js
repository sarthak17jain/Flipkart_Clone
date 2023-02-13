const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
// import path from 'path';
// import { v4 as uuid } from 'uuid';

const DefaultData = require('./default.js');
const productRouter = require('./routes/productRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const authRouter = require('./routes/authRouter.js');
const paymentRouter = require('./routes/paymentRouter.js');

const app = express();
console.log()
const PORT = process.env.PORT || 8000;
const db_link = process.env.DB_LINK;
console.log(process.env.PORT);
console.log(process.env.CLIENT_URL);

//rawBody in form of buffer data is required for Stripe 
//req.body -> parsed JSON
//req.rawData -> req in form on buffer
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
}))
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
//cors with options credentials: true and origin: .. is required for cookie to be sent and received 
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
//we use middleware function for cookieParser so that we can access our cookies from anywhere
app.use(cookieParser());

mongoose.set('strictQuery', true);

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
DefaultData();

app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/payment', paymentRouter);
app.use('/cart', cartRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'public/build' ));
    console.log(__dirname);
    console.log(path.join(__dirname, 'public', 'build', 'index.html'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'build', 'index.html')); // relative path
    });
}
//PAYTM:
// export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
// //callback url is called after success or failure of payment
// export let paytmParams = {

// };
// paytmParams['MID'] = process.env.PAYTM_MID,
// paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
// paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
// paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
// paytmParams['ORDER_ID'] = uuid(),
// paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
// paytmParams['CALLBACK_URL'] = 'http://localhost:8000/payment/callback'
// paytmParams['MOBILE_NO'] = '1234567852'
