import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    console.log('Heyya',    action.type);
    switch(action.type) {
        case actionTypes.ADD_TO_CART: {
            const item = action.payload;
            let newCartItems = [];
            let alreadyExists = false;

            for(let product of state.cartItems){
                if(product.id === item.id){
                    alreadyExists = true;
                    newCartItems.push({...product, quantity:product.quantity+1});       
                }else{
                    newCartItems.push({...product});                   
                }
            }

            if(!alreadyExists){
                newCartItems.push({...item});
            }

            return { ...state, cartItems: newCartItems};
        }
        case actionTypes.REMOVE_FROM_CART: {
            // console.log(state.cartItems)
            // console.log(action.payload);
            let s =  {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
            // console.log(s);
            return s;
        }
        case actionTypes.UPDATE_QUANTITY: {
            const payload = action.payload;
            // console.log(state.cartItems);
            // console.log(payload);
            let t =  {
                ...state, cartItems: state.cartItems.map(product => product.id === payload.id ? {...product, quantity:payload.quantity} : product)
            }
            // console.log(t);
            return t;      
        }
        case actionTypes.SET_CART: {
            let payload = action.payload;
            // console.log(payload);
            return {...state, cartItems: payload}  
        }
        case actionTypes.EMPTY_CART: {
            return {...state, cartItems: []}  
        }
        default:
            return state;
    }
}