import { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/actions/cartActions';
import TotalView from './TotalView';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { LoginContext } from '../../context/ContextProvider';
import LoginDialog from '../Login/LoginDialog';
import { makePayment } from '../../service/api';

const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 135px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        padding: '15px 0'
    }
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const cartDetails = useSelector(state => state.cart);
    // const { cartItems, totalPrice, totalDiscount } = cartDetails;X
    const { cartItems } = cartDetails;
    const { account, setAccount } = useContext(LoginContext);
    const [open, setOpen] = useState(false);
    const [paymentPending, setPaymentPending] = useState(false);
    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        //optional chaining javascript
        dispatch(removeFromCart(account?.email, id));
    }

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [countItems, setCountItems] = useState(0);

    useEffect(() => {
        const generateInvoice = () => {
            let price = 0, discount = 0;
            // console.log(cartItems);
            let numItems = 0;
            cartItems.forEach(item => {
                price += item.quantity*item.price.mrp;
                discount += item.quantity*(item.price.mrp - item.price.cost);
                numItems += item.quantity;
            })
            setCountItems(numItems);
            setTotalPrice(price);
            setTotalDiscount(discount);
        }
        generateInvoice();
    }, [cartItems]);
    
    const buyNow = () => {
        if(!account){
            setOpen(true);
            setPaymentPending(true);
        }else{
            try{
                // makePayment(totalPrice, account.email);
                toast.info('Redirecting to Stripe Checkout Page!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                makePayment(account.email, cartItems, true);
            }catch(err){
                console.log("payment failed");
                console.log(err);
            }
        }
    }
    useEffect(()=>{
        if(paymentPending && !!account){
            try{
                // makePayment(totalPrice, account.email);
                toast.info('Redirecting to Stripe Checkout Page!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                makePayment(account.email, cartItems, true);
            }catch(err){
                console.log("payment failed");
                console.log(err);
            }
            setPaymentPending(false);
        }
    }, [paymentPending, account])

    return (
        <>
        { cartItems.length ? 
            <Component container>
                <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Header>
                        {   cartItems.map(item => (
                                <CartItem item={item} key={item.id} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <BottomWrapper>
                        <StyledButton onClick={() => buyNow()} variant="contained">Place Order</StyledButton>
                    </BottomWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    {/* <TotalView cartItems={cartItems} countItems={countItems} totalPrice={totalPrice} totalDiscount={totalDiscount}/> */}
                    <TotalView countItems={countItems} totalPrice={totalPrice} totalDiscount={totalDiscount}/>
                </Grid>
            </Component> : <EmptyCart />
        }
        </>

    )
}

export default Cart;