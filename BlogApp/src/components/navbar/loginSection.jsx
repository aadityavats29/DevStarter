import React, { useEffect, useContext } from 'react';
import './navbar.css';
import { DataContext } from '../context/dataContext';
import { useNavigate } from 'react-router-dom';
import { Menu, styled, Button } from '@mui/material';

const StyledMenu = styled((props) => (
    <Menu
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(0.5),
        minWidth: 140,  
        width: 140
    },
}));

const LoginButton = () => {
    const { account, setAccount } = useContext(DataContext);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            console.log(localStorage.getItem("userId"));
            setAccount(true);
        }
    }, [account]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        handleClose()
        window.location.reload();
    }
    const UserPage = ()=>{
        navigate('/user');
        handleClose();
    }


    return (
        <>
            {
                account ?
                    <>
                        <div className='absolute right-[40px] top-3 gap-2 flex cursor-pointer' >
                            <div onClick={handleClick} className='flex gap-2'>
                                <img  className='w-[45px] h-[45px] relative rounded-full ring-gray-300 dark:ring-gray-500' src={localStorage.getItem('userImage') || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'} />
                                <p className='relative top-[8px] hidden md:block text-lg'>{localStorage.getItem('username')}</p>
                            </div>
                            <StyledMenu sx={{ display: 'flex', flexDirection: 'column' }} id="basic-menu" MenuListProps={{ 'aria-labelledby': 'basic-button' }} anchorEl={anchorEl} open={open} onClose={handleClose} >
                                <Button onClick={UserPage} style={{ width: '100%', color: 'white' }} variant="text">Profile</Button>
                                <Button onClick={handleClose} style={{ width: '100%', color: 'white' }} variant="text">About</Button>
                                <Button onClick={logout} style={{ width: '100%', color: 'white' }} variant="text">Log Out</Button>
                            </StyledMenu>
                        </div>
                    </>
                    :
                    <button className="absolute btn right-[7px] md:right-[30px]" onClick={() => { navigate('/login') }} style={{ position: 'absolute',bottom:'10px',color:'white',scale:'0.85'}}>LOGIN</button>
            }

        </>
    )
}
export default LoginButton;