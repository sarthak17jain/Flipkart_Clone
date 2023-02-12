import React, { useState, useContext } from 'react';

import { Box, Typography, Badge, Button } from '@mui/material';
import { styled } from '@mui/system';
import { ShoppingCart } from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { LoginContext } from '../../context/ContextProvider';
import { useSelector } from 'react-redux';

import Profile from './Profile';
import LoginDialog from '../Login/LoginDialog';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    flexDirection: 'row',
    '& > *': {
        textDecoration: 'none',
        color: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            color: 'black',
        },
    },
    [theme.breakpoints.down('md')]: {
        gap: '10px'
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        marginTop: '20px',
        gap: '20px'
    },
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#2874f0',
    background: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: '#2874f0',
        color: '#FFFFFF'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}));

const CustomButtons = () => {
    
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;

    const openDialog = () => {
        setOpen(true);
    }

    return (
        <Wrapper>
            {
                account ? <Profile username={account.username} setAccount={setAccount} /> :
                    <LoginButton variant="contained" sx={{color:'default'}}onClick={() => openDialog()}>Login</LoginButton>
                
            }            
            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart sx={{color: '#551A8B'}}/>
                </Badge>
                <Typography style={{ margin: "0 0 0 10px"}}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Wrapper>
    )
}

export default CustomButtons;