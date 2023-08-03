import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

export const addToCart = (userEmail, id) => async (dispatch, getState) => {
    try { 
        //inorder to get realtime price data otherwise if product is passed as a prop then 
        //the product data might get outdated
        const { data: productData } = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/productData/${id}`);
        // console.log(productData);
        dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...productData } });
        userEmail && await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/add`, { userEmail: userEmail, data: productData});

        // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        console.log('Error while calling cart API');
    }
};

export const removeFromCart = (userEmail, id) => async (dispatch, getState) => {
    console.log(id);
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })
    userEmail && await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/remove`, {userEmail: userEmail, data: id});
    // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const updateQuantity = (userEmail, id, quantity) => async (dispatch, getState) => {
    console.log("updateQuantity called "+id);
    if(quantity===0){
        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: id
        })
        userEmail && await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/remove`, {userEmail: userEmail, data: id});
    }else{
        const data = {
            id: id,
            quantity: quantity
        };
        dispatch({
            type: actionTypes.UPDATE_QUANTITY,
            payload: data
        })        
        userEmail && await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/cart/update`, {userEmail: userEmail, data: data});
    }
    // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}

export const setCart = (cart) => (dispatch, getState) => {
    // console.log(cart);
    dispatch({
        type: actionTypes.SET_CART,
        payload: cart
    })
};

export const emptyCart = () => (dispatch, getState) => {
    console.log("empty cart called")
    dispatch({
        type: actionTypes.EMPTY_CART
    })
};