import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { makePayment } from '../../service/api';

import { addToCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

import { LoginContext } from '../../context/ContextProvider';
import LoginDialog from '../Login/LoginDialog';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)`
    width: 46%;
    border-radius: 2px;
    height: 50px;
    color: #FFF;
`;

const ActionItem = ({ product, price }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    const { account, setAccount } = useContext(LoginContext);
    const [open, setOpen] = useState(false);
    const [paymentPending, setPaymentPending] = useState(false);
    const dispatch = useDispatch();

    const buyNow = () => {
        if(!account){
            setOpen(true);
            setPaymentPending(true);
        }else{
            try{
                // makePayment(price, account.email);
                makePayment(account.email, [product], false);
            }catch(err){
                console.log("payment failed");
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        if(paymentPending && !!account){
            try{
                // makePayment(price, account.email);
                makePayment(account.email, [product], false);
            }catch(err){
                console.log("payment failed");
                console.log(err);
            }
            setPaymentPending(false);
        }
    }, [paymentPending, account, product])

    const addItemToCart = () => {
        if(!!account){
            toast.success("Product added to cart!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            dispatch(addToCart(account?.email, id));
            navigate('/cart');
        }else{
            toast.error("Please Login!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    
    return (
        <>
            <LeftContainer>
                <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
                <Image src={product.detailUrl} /><br />
                <StyledButton onClick={() => addItemToCart()} style={{marginRight: 10, background: '#ff9f00'}} variant="contained"><Cart />Add to Cart</StyledButton>
                <StyledButton onClick={() => buyNow()} style={{background: '#fb641b'}} variant="contained"><Flash /> Buy Now</StyledButton>
            </LeftContainer>
        </>
    )
}

export default ActionItem;