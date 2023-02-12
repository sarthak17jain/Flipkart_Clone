import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    email: {
        type: String
    },
    cartItems: []
});

let cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;