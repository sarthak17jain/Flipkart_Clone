const Product = require('../model/productSchema.js');


const getProducts = async (request, response) => {
    try {
        console.log("getproductscalled");
        const products = await Product.find({});

        response.json(products);
    }catch (error) {

    }
}

const getProductById = async (request, response) => {
    try {
        console.log('Hie '+request.params.id);
        const product = await Product.findOne({ 'id': request.params.id });
        console.log(product);
        response.json(product);
    }catch (error) {
        console.log("getProductById error: "+error);
    }
}

module.exports = {getProducts, getProductById};