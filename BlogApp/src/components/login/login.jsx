import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState,useContext } from "react";
import Cartoon from './cartoon.png';
import Google from './images.png';
import {LoginUser} from '../api/api.js';
import { DataContext } from '../context/dataContext.jsx';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './login.css';


const loginForm = {
    email:'',
    password:''
}

const Login = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [login,setLogin] = useState(loginForm);
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    
    const toastSuccess = ()=>{
        toast.success("User Login Successfull",{
            position:'top-center',
            className:"toast"
        });
    }
    const toastFail = (message)=>{
        toast.error(message,{
            position:'top-center',
            className:"toast"
        });
    }
    const togglePassVisible = () => {
        setPassVisible(!passVisible);
    }
    const onInputChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
        console.log(login);
    }

const Loginuser = async ()=>{
        const response = await LoginUser(login);
        console.log(response);
        if(response.status && response.status=='success'){
            toastSuccess();
            setTimeout(()=>{
                console.log("Navigation to intro");
                setAccount(true);
                console.log(response);
                localStorage.setItem('admin',response.admin);
                localStorage.setItem('token',response.token);
                localStorage.setItem('userId',response.id);
                localStorage.setItem('userImage',response.image);
                localStorage.setItem('userEmail',response.email);
                localStorage.setItem('username',response.username);
                navigate('/intro');
            },2000)
            console.log("Login Successfull");
        } else if(response.status && response.status==='fail'){
            toastFail(response.message);
        }
    }
    return (
        <>
            <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
            <div className="h-screen flex justify-center items-center bg-#191919">
                <div className="h-[450px] w-[95%] xl:w-[45%] lg:w-[55%] md:w-[70%] sm:w-[90%] flex bg-#191919 p-4 rounded-md">
                    <div className='flex flex-col flex-1'>
                        {/* lOGIN Title */}
                        <div className="w-full h-[110px] flex justify-center items-center">
                            <p className="font-bold text-5xl text-white">Login</p>
                        </div>
                        {/* Email Logindiv*/}
                        <div>
                            <label for="first_name" className="block font-medium text-md">Email</label>
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <MailIcon className="text-gray-500" />
                                </div>
                                <input type="email" onChange={(e)=>{onInputChange(e)}} name='email' id="input-group-1" className=" border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 " placeholder="Enter Email" required />
                            </div>
                        </div>
                        {/* password Login FOrm  */}
                        <div>
                            <label for="first_name" className="block mb-1 text-sm font-medium ">Password</label>
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer" onClick={togglePassVisible}>
                                    {passVisible ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />}
                                </div>
                                <input type={passVisible ? 'text' : 'password'} onChange={(e)=>{onInputChange(e)}} name='password' id="input-group-1" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5  " placeholder="Enter Password" required />
                            </div>
                        </div>
                        {/* Forgot password */}
                        <div className="flex w-full justify-between mb-3">
                            <p  onClick={()=>navigate('/signin')} className="text-white cursor-pointer pt-2 pb-2 ">Create an Account ?</p>
                            <p className="text-blue-500 cursor-pointer pt-2 pb-2 ">Forgot Password ?</p>
                        </div>
                        {/* Button Login */}
                        <div className="flex justify-center mb-3">
                            <button onClick={Loginuser} className="border-2 w-full text-center text-white bg-black text-xl p-1 font-bold rounded-md hover:text-black hover:bg-white hover:border-black" type="submit">Login</button>
                        </div>
                        {/* Login with Google    */}
                        <div className="flex w-full justify-center">
                            <button className="w-full h-[35px] border-2 text-black border-black justify-center bg-white flex gap-4 rounded-md">
                                <img className=" h-full " src={Google} alt="google image" />
                                <p className="flex h-full items-center font-bold ">Login with Google</p>
                            </button>
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