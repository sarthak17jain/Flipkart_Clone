import { useState } from 'react';
import { userLogout } from '../../service/api';
import { Link } from 'react-router-dom';
import { Typography, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/system';
import { PowerSettingsNew } from '@mui/icons-material';
import { emptyCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const Component = styled(Menu)`
    margin-top: 20px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;

const Profile = ({ username, setAccount }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = async () => {
        let response = await userLogout();
        if(!response){
            toast.error("Logout Error! Please try again", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }else{
            setAccount('');
            dispatch(emptyCart());
        }
    }
    
    return (
        <>
            <Link to='#' onClick={handleClick}><Typography style={{ marginTop: 2 }}>{username}</Typography></Link>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); logout();}}>
                    <PowerSettingsNew fontSize='small' color='primary'/> 
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )    
}

export default Profile;