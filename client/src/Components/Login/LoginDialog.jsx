import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, TextField, Box, Button, Typography } from '@mui/material';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { toast } from 'react-toastify';
import { authenticateLogin, authenticateSignup } from '../../service/api';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { getCart } from '../../service/api';
import { setCart } from '../../redux/actions/cartActions';

const Component = styled(DialogContent)(({ theme }) => ({
    height: "65vh",
    padding: "0",
    width: "650px",
    [theme.breakpoints.down('lg')]: {
        width: "65vw"
    },
    [theme.breakpoints.down('md')]: {
        width: "75vw"
    },
    [theme.breakpoints.down('sm')]: {
        width: "90vw"
    },
}));

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const RequestOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`

const Wrapper = styled(Box)(({ theme }) => ({
    padding: "25px 35px",
    display: "flex",
    flex: "1",
    // overflow: "auto",
    // width: "fit-content",
    flexDirection: "column",
    "& > div, & > button, & > p" : {
        marginTop: "20px",
    },
    [theme.breakpoints.down('sm')]: {
        padding: "5px 10px"
    },
}));

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const Image = styled(Box)(({ theme }) => ({
    background: '#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat',
    width: '40%',
    height: '100%',
    padding: '45px 35px',
    "& > p, & > h5" : {
        color: "#FFFFFF",
        fontWeight: "600"
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

const LoginDialog = ({ open, setOpen, setAccount }) => {
    const [ login, setLogin ] = useState(loginInitialValues);
    const [ signup, setSignup ] = useState(signupInitialValues);
    const [ error, showError] = useState(false);
    const [ account, toggleAccount ] = useState(accountInitialValues.login);
    const dispatch = useDispatch();

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const setCartData = async (email) => {
        try{
            let cart = await getCart(email);
            // console.log(cart);
            dispatch(setCart(cart));
        }catch(err){
            console.log(err);
        }
    }

    const loginUser = async() => {
        let response = await authenticateLogin(login);
        // console.log(response);
        if(!response){ 
            showError(true);
        }else {
            showError(false);
            handleClose();
            setAccount(response.data.account);
            setCartData(login.email);
        }
    }

    const signupUser = async() => {
        let response = await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(response.data.account);
    }
    
    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
    }

    const handleLogin = () => {
        if(login.email && login.password){
            loginUser();
        }else{
            toast.error("Please fill all inputs!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const handleSignup = () => {
        if(signup.firstname && signup.lastname && signup.username && signup.email && signup.password){
            signupUser();
        }else{
            toast.error("Please fill all inputs!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                    <Image>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: 20}}>{account.subHeading}</Typography>
                    </Image>
                    {
                        account.view === 'login' ? 
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onValueChange(e)} name='email' label='Enter Email' />
                            {/* <TextField variant="standard" onChange={(e) => onValueChange(e)} name='password' type="password" label='Enter Password' /> */}
                            <FormControl variant="standard">
                                <InputLabel htmlFor="login-password">Enter Password</InputLabel>
                                <Input
                                    id="login-password"
                                    type={showLoginPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowLoginPassword((show) => !show)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => onValueChange(e)}
                                    name="password"
                                />
                            </FormControl>
                            { error && <Error>You have entered an invalid email or password</Error> }
                            <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                            <LoginButton onClick={() => handleLogin()} >Login</LoginButton>
                            <Text style={{textAlign:'center'}}>OR</Text>
                            <RequestOTP>Request OTP</RequestOTP>
                            <CreateAccount onClick={() => toggleSignup()}>New to Flipkart? Create an account</CreateAccount>
                        </Wrapper> : 
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label='Enter Firstname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label='Enter Lastname' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label='Enter Email' />
                            {/* <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' /> */}
                            <FormControl variant="standard">
                                <InputLabel htmlFor="signup-password">Enter Password</InputLabel>
                                <Input
                                    id="signup-password"
                                    type={showSignUpPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowSignUpPassword((show) => !show)}
                                                onMouseDown={(e) => e.preventDefault()}
                                            >
                                                {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => onInputChange(e)}
                                    name="password"
                                />
                            </FormControl>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' />
                            <LoginButton onClick={() => handleSignup()} >Continue</LoginButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;