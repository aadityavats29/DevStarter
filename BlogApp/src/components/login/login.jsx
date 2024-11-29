import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useContext } from "react";
import Cartoon from './cartoon.png';
import { LoginUser } from '../api/api.js';
import { DataContext } from '../context/dataContext.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const loginForm = {
    email: '',
    password: ''
}

const Login = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [login, setLogin] = useState(loginForm);
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();
    
    const toastSuccess = () => {
        toast.success("User Login Successful", {
            position: 'top-center',
            className: "toast"
        });
    }

    const toastFail = (message) => {
        toast.error(message, {
            position: 'top-center',
            className: "toast"
        });
    }

    const togglePassVisible = () => {
        setPassVisible(!passVisible);
    }

    const onInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // const validatePassword = (password) => {
    //     // Password must have at least one number, one letter, and be at least 6 characters long
    //     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    //     return passwordRegex.test(password);
    // }

    const Loginuser = async () => {
        const { email, password } = login;

        if (!validateEmail(email)) {
            toastFail("Please enter a valid email.");
            return;
        }

        // if (!validatePassword(password)) {
        //     toastFail("Password must be at least 6 characters long and contain at least one letter and one number.");
        //     return;
        // }

        const response = await LoginUser(login);
        if (response.status && response.status === 'success') {
            toastSuccess();
            setTimeout(() => {
                setAccount(true);
                localStorage.setItem('admin', response.admin);
                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.id);
                localStorage.setItem('userImage', response.image);
                localStorage.setItem('userEmail', response.email);
                localStorage.setItem('username', response.username);
                navigate('/intro');
            }, 2000);
        } else if (response.status && response.status === 'fail') {
            toastFail(response.message);
        }
    }

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className="h-screen flex justify-center items-center bg-#191919">
                <div className="h-[450px] w-[95%] xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[90%] flex bg-#191919 p-4 rounded-md">
                    <div className='flex flex-col flex-1'>
                        {/* Login Title */}
                        <div className="w-full h-[110px] flex justify-center items-center">
                            <p className="font-bold text-5xl text-white">Login</p>
                        </div>
                        {/* Email Login */}
                        <div>
                            <label htmlFor="email" className="block font-medium text-md">Email</label>
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <MailIcon className="text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    onChange={(e) => { onInputChange(e) }}
                                    name='email'
                                    id="input-group-1"
                                    className="border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5"
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>
                        </div>
                        {/* Password Login */}
                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm font-medium ">Password</label>
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer" onClick={togglePassVisible}>
                                    {passVisible ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />}
                                </div>
                                <input
                                    type={passVisible ? 'text' : 'password'}
                                    onChange={(e) => { onInputChange(e) }}
                                    name='password'
                                    id="input-group-1"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5"
                                    placeholder="Enter Password"
                                    required
                                />
                            </div>
                        </div>
                        {/* Forgot password */}
                        <div className="flex w-full justify-between mb-3">
                            <p onClick={() => navigate('/signin')} className="text-white cursor-pointer pt-2 pb-2 ">Create an Account ?</p>
                        </div>
                        {/* Button Login */}
                        <div className="flex justify-center mb-3">
                            <button onClick={Loginuser} className="border-2 w-full text-center text-white bg-black text-xl p-1 font-bold rounded-md hover:text-black hover:bg-white hover:border-black" type="submit">Login</button>
                        </div>
                    </div>
                    {/* Johny Test Logo */}
                    <div className="hidden sm:block flex-1/2">
                        <img className="w-full h-full" src={Cartoon} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
