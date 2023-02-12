import { useState } from 'react';
import { ClickAwayListener } from '@mui/base';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer } from '@mui/material';
import { styled } from '@mui/system';
import { Menu } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

//components
import CustomButtons from './CustomButtons';
import Search from './Search';

const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
`;

const Component = styled(NavLink)(({ theme }) => ({
    marginLeft: '12%',
    lineHeight: '0',
    color: '#FFFFFF',
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
        marginLeft: '2%',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        marginLeft: '0',
    },
}));

const SubHeading = styled(Typography)`
    font-style: italic;
`

const PlusImage = styled('img')({
    width: '13.4%',
    height: '13.4%',
    marginLeft: '5.3%',
})

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    marginLeft: '0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('md')]: {
        margin: '0 0 0 auto', 
    },
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    },
}));

const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const logoWidth = 65;
    return (
        <StyledHeader position="fixed">
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>
                <ClickAwayListener
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                    onClickAway={() => open && setOpen(false)}
                >
                    <Drawer open={open} variant="persistent" onClose={handleClose} PaperProps={{sx: { width: "50%" },}}>
                        <CustomButtons/>
                    </Drawer>
                </ClickAwayListener>

                <Component to='/' style={{width: `${logoWidth}px`,}}>
                    <img src={logoURL} style={{ width: '100%' }} />
                    <Box component="span" style={{ display: 'flex' }}>
                        <SubHeading style={{ fontSize: logoWidth / 7.5 }}>Explore&nbsp;
                            <Box component="span" style={{color:'#FFE500'}}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} />
                    </Box>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;