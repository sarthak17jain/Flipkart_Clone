import { createContext, useState, useEffect } from 'react';
import { checkUser, getCart } from '../service/api';
import axios from 'axios';
import { setCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState('');
    
    const dispatch = useDispatch();
    const setCartData = async (email) => {
        try{
            let cart = await getCart(email);
            // console.log(cart);
            dispatch(setCart(cart));
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        // console.log("useEffect login context called")
        // try{
        //     const res = checkUser();
        //     console.log(res);
        //     setAccount(res.account);
        // }catch(err){
        //     console.log("client contextprovider error");
        //     console.log(err);
        // }
        const checkUser = async ()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/checkuser`, {withCredentials: true});
                console.log(res);
                const accountDetails = res.data.account;
                setAccount(accountDetails);
                setCartData(accountDetails.email);
            }catch(error){
                console.log('error', error);
            }
        }
        checkUser();
    }, []);
    return (
        <LoginContext.Provider value={{ account, setAccount }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;