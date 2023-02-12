import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`
const TotalView = ({ countItems, totalPrice, totalDiscount }) => {
    return (
        <Box> 
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({countItems} item)
                    <Price component="span">₹{totalPrice}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{totalDiscount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>₹{totalPrice - totalDiscount + 40}</Price>
                </TotalAmount>
                <Discount>You will save ₹{totalDiscount - 40} on this order</Discount>
            </Container>
        </Box>
    )
}

export default TotalView;