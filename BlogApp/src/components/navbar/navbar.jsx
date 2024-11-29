import React, { useContext } from 'react';
import { AppBar, Toolbar, styled, Box, Drawer } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginButton from './loginSection';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../context/dataContext';

const drawerWidth = 240;
import './navbar.css';


const EditToolbar = styled(Toolbar)`
    width: 100%;
    display: flex;
    justify-content: center;
`;
const ScrollTrack = styled(Box)`
    height:4.5px;
    position:fixed;
    left:0px;
    width:100%;
    transform-origin:left;
    scale: 0 1;
    background-color:white;
    animation:scroll-watch linear;
    animation-timeline:scroll();
    @keyframes scroll-watch {
        to{
            scale:1 1;
        }
    }
    background: rgb(174,58,180);
    background: linear-gradient(90deg, rgba(174,58,180,1) 0%, rgba(253,64,29,1) 61%, rgba(252,176,69,1) 100%);
`

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const { account } = useContext(DataContext);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };
    const NaviButton = styled(NavLink)`
        padding-top:20px;
        padding-bottom:20px;
        color:white;
        text-decoration:none;
        text-align:center;
    `
    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ width: '100%' }}  className='mt-3'>
                    <EditToolbar className='bg-black ' position='fixed' sx={{ height: { xs: '65px' } }}>
                        <img src='https://demos.onepagelove.com/html/devbook/assets/images/site-logo.svg'
                             className="absolute btn left-[7px] md:right-[30px]"
                        />
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' }, position: 'absolute', left: '5vh', scale: '1.4' }} >
                            <MenuIcon />
                        </IconButton>
                        <div className='w-[55%] hidden sm:flex justify-around'>
                            <NavLink style={{ fontSize: "20px" }} to={'/intro'}>Intro</NavLink>
                            <NavLink style={{ fontSize: "20px" }} to={'/about'}>About</NavLink>
                            <NavLink style={{ fontSize: "20px" }} to={'/contact'}>Contact</NavLink>
                            {account && <NavLink style={{ fontSize: "20px" }} to={'/user'}>Profile</NavLink>}
                            {account && <NavLink style={{ fontSize: "20px" }} to={'/blogs'}>Blogs</NavLink>}
                        </div>
                        <LoginButton />
                    </EditToolbar>
                </AppBar>
                <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
                    <Drawer variant="temporary" open={mobileOpen} onTransitionEnd={handleDrawerTransitionEnd} onClose={handleDrawerClose}
                        ModalProps={{ keepMounted: true }}
                        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'black', }, }}>
                        <Box style={{width:'100%',display:'flex',flexDirection:'column',paddingTop:'30px'}}>
                        <Box style={{width:'100%',display:'flex',flexDirection:'column'}}>   
                            <NaviButton onClick={handleDrawerClose} className="active" to={'/'}>home</NaviButton>
                            <NaviButton  onClick={handleDrawerClose} className="active" to={'/user'}>Profile</NaviButton>
                            <NaviButton  onClick={handleDrawerClose} className="active" to={'/contact'}>Contact</NaviButton>
                            {account && <NaviButton  onClick={handleDrawerClose} className="active" to={`/blogs`}>Blogs</NaviButton>}
                        </Box>
                    </Box>
                    </Drawer>
                </Box>
            </Box>
            <ScrollTrack sx={{ top: { sm: '64px', xs: '56px' }, zIndex: '3' }}></ScrollTrack>
        </>
    );
}
export default Navbar;