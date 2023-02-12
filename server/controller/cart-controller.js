import cartModel from '../model/cartSchema.js';

export const addItem = async (req, res) => {
    console.log("server addItem called");
    const {userEmail, data: product} = req.body;
    try{
        const cartDoc = await cartModel.findOne({email: userEmail});
        let cart = cartDoc.cartItems;
        console.log(product);
        let itemIndex = -1;
        //findIndex runs only if cart isn't empty
        if(cart.length){
            itemIndex = cart.findIndex(p => p.id == product.id);
        }

        // Check if product exists or not
        if(itemIndex > -1){
            let productItem = cart[itemIndex];
            productItem.quantity++;
            cart[itemIndex] = productItem;
        }else {
            cart.push(product);
        }
        await cartDoc.save();
        return res.status(201).end();     
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
export const removeItem = async (req, res) => {
    const {userEmail, data: productId} = req.body;
    console.log("server removeItem called");
    console.log(`${userEmail} ${productId}`);
    try{
        const cartDoc = await cartModel.findOne({email: userEmail});
        let cart = cartDoc.cartItems;

        const itemIndex = cart.findIndex(p => p.id == productId);

        // Check if product exists or not
        if(itemIndex > -1){
            cart.splice(itemIndex, 1);
        }

        await cartDoc.save();
        // console.log(cart);
        return res.status(201).end();     
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}
export const updateQuantity = async (req, res) => {
    const { userEmail, data: {id: productId, quantity} } = req.body;
    console.log("server updateQuantity called");
    console.log(`${userEmail} ${productId} ${quantity}`);
    try{
        let cartDoc = await cartModel.findOne({email: userEmail});
        let cart = cartDoc.cartItems;

        const itemIndex = cart.findIndex(p => p.id == productId);
        // Check if product exists or not
        if(itemIndex > -1){
            let productItem = cart[itemIndex];
            productItem.quantity = quantity;
            cart[itemIndex] = productItem;
        }

        await cartDoc.save();
        return res.status(201).end();     
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

export const getCart = async (req, res) => {
    console.log("server getCart called");
    const {userEmail} = req.body;
    try{
        const cartDoc = await cartModel.findOne({email: userEmail});
        const cart = cartDoc.cartItems;
        return res.status(201).send(cart);    
    } catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}