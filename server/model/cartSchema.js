const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    email: {
        type: String
    },
    cartItems: []
});

let cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;