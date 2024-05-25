import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import { FaUser } from "react-icons/fa";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import './sign.css';
import { signUser } from '../api/api';
import Cartoon from './cartoon.png';
import Google from './images.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const signUp = {
    username:'',
    password:'',
    image:'',
    email:''
}
const Signin=()=>{
    const navigate = useNavigate();
    const [signdetail,setSignDetails] = useState(signUp);
    const [passVisible,setPassVisible]=useState(false);
    const togglePassVisible=()=>{
        setPassVisible(!passVisible);   
    }
    const toastSuccess = ()=>{
        toast.success("User SignUp Successfull",{
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
    const onInputChange = (e)=>{
        console.log(signUser);
        setSignDetails({...signdetail,[e.target.name]:e.target.value});
    }
    const signingUser = async () =>{ 
        const response = await signUser(signdetail);
        if(response.status && response.status==='success'){
            toastSuccess();
            setTimeout(()=>{
                navigate('/login');
            },2000)
        } else if(response.status && response.status==='fail'){
            setSignDetails(signUp);
            toastFail(response.message);
        }
    }
    return (
        <>
            <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
            <div className="h-screen flex justify-center items-center bg-#191919">
                <div className="h-[530px] w-[95%] xl:w-[50%] lg:w-[65%] md:w-[75%] flex bg-#191919 p-4 rounded-md">
                    {/* Johny Test Logo */}
                    <div className="hidden sm:block flex-1/4">
                        <img className="w-full h-full scale-x-[-1] scale-[0.95]" src={Cartoon} alt="" />
                    </div>
                    <div className='flex flex-col flex-1'>
                        {/* Signup Title */}
                        <div className="w-full h-[110px] flex justify-center items-center">
                            <p className="font-bold text-5xl text-white ">Sign Up</p>
                        </div>
                        {/* Username */}
                        <div>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <FaUser className="text-gray-500" />
                                </div>
                                <input type="text" value={signdetail.username} onChange={(e)=>{onInputChange(e)}} name='username' id="input-group-1" className=" border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 " placeholder="Enter Username" required />
                            </div>
                        </div>
                        {/* Email Login Form  */}
                        <div>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <MailIcon className="text-gray-500" />
                                </div>
                                <input type="email" value={signdetail.email} onChange={(e)=>{onInputChange(e)}} name='email' id="input-group-1" className=" border text-black border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 " placeholder="Enter Email" required />
                            </div>
                        </div>
                        {/* password Login FOrm  */}
                        <div>   
                            <div className="relative mb-2"> 
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer" onClick={togglePassVisible}>
                                    {passVisible ? <VisibilityIcon className="text-gray-500" /> : <VisibilityOffIcon className="text-gray-500" />}
                                </div>
                                <input type={passVisible ? 'text' : 'password'} value={signdetail.password} onChange={(e)=>{onInputChange(e)}} name='password' id="input-group-1" className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5  " placeholder="Enter Password" required />
                            </div>
                        </div>
                        {/* Forgot password */}
                        <div className="flex w-full justify-between mb-3 pt-2 pb-2">
                            <p onClick={()=>navigate('/login')} className="text-white cursor-pointer">Alerady have a account ?</p>
                            <p className="text-blue-500 cursor-pointer">Forgot Password ?</p>
                        </div>
                        {/* Button Login */}
                        <div className="flex justify-center mb-3">
                            <button className="border-2 w-full text-center text-white bg-black text-xl p-1 font-bold rounded-md hover:text-black hover:bg-white hover:border-black" type="submit" onClick={signingUser}>Sign in</button>
                        </div>
                        {/* Login with Google    */}
                        <div className="flex w-full justify-center ">
                            <button className="w-full h-[35px] border-2 border-black justify-center text-black bg-white flex gap-4 rounded-md">
                                <img className=" h-full " src={Google} alt="google image" />
                                <p className="flex h-full items-center font-bold">Sign in with Google</p>
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Signin;