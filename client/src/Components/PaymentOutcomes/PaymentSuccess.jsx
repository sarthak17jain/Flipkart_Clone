import { Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 80%;
    background: #fff;
    margin: 5vh auto;
`;

const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`;

const ContinueShopping = styled(Button)`
    margin: 20px 0 0 0;
    text-transform: none;
    background: #006AE8;
    color: #fff;
    height: 48px;
    border-radius: 5px;
    font-size: 20px;
    padding: 15px;
    &:hover {
        background-color: #1C84FF;
    }
`;

const PaymentSuccess = () => {
    const navigate = useNavigate();
    return (
        <Component>
            <Container>
                <CheckCircleIcon sx={{ fontSize: 130, color:'green' }}></CheckCircleIcon>
                <Typography variant="h4">Payment Successful!</Typography>
                <ContinueShopping onClick={()=>navigate('/')}>Continue Shopping</ContinueShopping>
            </Container>
        </Component>
    )
}

export default PaymentSuccess;