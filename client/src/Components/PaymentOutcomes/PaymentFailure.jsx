import { Typography, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
// import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 80%;
    background: #fff;
    margin: 5vh auto;
`;

const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`;

const PaymentFailure = () => {
    return (
        <Component>
            <Container>
                <CancelIcon sx={{ fontSize: 130, color:'red' }}></CancelIcon>
                <Typography variant="h4">Payment Failed!</Typography>
                <Typography sx={{marginTop: '10px', fontSize: '20px'}}>Please try again</Typography>
            </Container>
        </Component>
    )
}

export default PaymentFailure;