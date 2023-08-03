import axios from 'axios';
// import { post } from '../utils/paytm';

const url = process.env.REACT_APP_SERVER_BASE_URL;

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/auth/login`, user, {withCredentials: true})
    } catch (error) {
        console.log("error api authlogin", error);
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        // return await axios.post(`${url}/auth/signup`, user);
        return await axios.post(`${url}/auth/signup`, user, {withCredentials: true});
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const userLogout = async () => {
    try {
        // return await axios.post(`${url}/auth/signup`, user);
        return await axios.get(`${url}/auth/logout`, {withCredentials: true});
    } catch (error) {
        console.log('error while calling logout API: ', error);
    }
}

export const checkUser = async ()=>{
    try{
        // const res = await axios.get(`${url}/auth/checkuser`);
        console.log("api checkuser called");
        const res = await axios.get(`${url}/auth/checkuser`, {withCredentials: true});
        return res.data;
    }catch(error){
        console.log('error', error);
        throw new Error(error);
    }
}

export const getProductById = async (id) => {
    try {
        return await axios.get(`${url}/productData/${id}`);
    } catch (error) {
        console.log('Error while getting product by id response', error);
    }
}

export const payUsingPaytm = async (data) => {
    try {
        let response = await axios.post(`${url}/payment/addpg`, data);
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}

export const getCart = async (email)=>{
    try{
        console.log("client getCart called");
        let response = await axios.post(`${url}/cart/getcart`, {userEmail: email});
        // console.log(response.data);
        return response.data;
    }catch (error) {
        console.log('error', error);
        throw new Error(error);
    }
}

export const makePayment = async (userEmail, items, isCartPayment)=>{
    console.log("makepayment called", userEmail, items)
    try{
        let res = await axios.post(`${url}/payment/checkout`, { email: userEmail, items: items, isCartPayment: isCartPayment});
        console.log("create session success");
        // console.log(res);
        window.location.assign(res.data.url);
    }catch(err){
        console.log("payment failure");
        console.log(err);
        throw new Error(err);
    }
}

// export const makePayment = async (totalPrice, userEmail)=>{
//     try{
//         console.log(`client api makePayment called ${totalPrice} ${userEmail}`);
//         let response = await payUsingPaytm({ amount: totalPrice, email: userEmail});
//         var information = {
//             action: 'https://securegw-stage.paytm.in/order/process',
//             params: response    
//         }
//         post(information);
//     }catch(err){
//         throw new Error(err);
//     }
// }