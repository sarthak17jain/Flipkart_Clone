import Product from '../model/productSchema.js';


export const getProducts = async (request, response) => {
    try {
        console.log("getproductscalled");
        const products = await Product.find({});

        response.json(products);
    }catch (error) {

    }
}

export const getProductById = async (request, response) => {
    try {
        console.log('Hie '+request.params.id);
        const product = await Product.findOne({ 'id': request.params.id });
        console.log(product);
        response.json(product);
    }catch (error) {
        console.log("getProductById error: "+error);
    }
}