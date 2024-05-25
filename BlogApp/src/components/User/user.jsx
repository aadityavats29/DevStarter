import { useEffect, useState, useRef } from "react";
import MailIcon from '@mui/icons-material/Mail';
import { FaUser } from "react-icons/fa";
import './user.css';
import { IoCodeSlashSharp } from "react-icons/io5"
import { FaPlus } from "react-icons/fa";
import UserBlog from "./userBlog";
import { getUserDetails,deleteUser} from "../api/api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
    const [user, setUser] = useState({});
    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserDetails();
            if (response.status && response.status === 'success') {
                setUser(response);
            }
        }
        fetchUserData();
    }, [])
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const DeleteUser = async ()=>{
        const response = await deleteUser();
        console.log(response);
        if (response.status && response.status === 'success') {
            toast.success("Your Blog is Updated", {
                position: 'top-center'
            });
            setTimeout(() => {
                navigate('/intro');
                localStorage.clear();
                setAccount(false);
            }, 1000);
        } else if (response.status && response.status === 'fail') {
            toast.error(response.message, {
                position: 'top-center'
            });
        }
    }
    return (<>
        <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
        <div className="w-[100%] h-[100vh] flex justify-center items-center ">
            <div className="h-[100%] sm:h-[450px] pt-[67px] sm:pt-0 sm:top-0 lg:w-[65%] md:w-[75%] sm:w-[95%] w-[100%] flex flex-col sm:flex-row">
                <div className="flex-1 flex items-center justify-center relative">
                    <img style={{ outline: '3px solid white', outlineOffset: '10px' }} className="w-[250px] h-[250px] rounded-full opacity-85" src={user.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'} alt="" />
                    <FaPlus className="absolute h-[40px] w-[40px] p-2 rounded-full cursor-pointer bg-slate-500 z-10" />
                </div>
                <div className="flex-1 sm:pt-[25px] flex-col gap-2 flex  items-center text-black p-4">
                    <div className="flex justify-center items-center">
                        <div>
                            <p className="text-[40px] mb-4 text-white">Profile Edit</p>
                        </div>
                    </div>
                    <div className="w-[100%]">
                        <div className="relative mb-2">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                <FaUser className=" text-[22px] text-gray-500" />
                            </div>
                            <input value={user.username} onChange={(e) => onInputChange(e)} type="text" name='username' id="input-group-1" className=" border text-black border-gray-300 text-lg rounded-lg focus:outline-none block w-full ps-10 p-2.5 " placeholder="Enter Username" required />
                        </div>
                    </div>
                    {/* Email Login Form  */}
                    <div className="w-[100%]">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                <MailIcon className=" text-[24px] text-gray-500" />
                            </div>
                            <input type="email" value={user.email} onChange={(e) => onInputChange(e)} name='email' id="input-group-1" className=" border text-black border-gray-300 text-lg rounded-lg focus:outline-none block w-full ps-10 p-2.5 " placeholder="Enter Email" required />
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col">
                        {/* <button class="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"> Hover me!
                            <span class="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left" ></span>
                            <span class="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                            <span class="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                            <span class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">Explore!</span>
                        </button> */}

                        <button className="cssbuttons-io pt-2 pb-2"> <span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><IoCodeSlashSharp style={{ fontSize: '25px' }} /></svg>Update</span></button>
                        <div className="w-[100%] flex justify-end">
                            <p onClick={DeleteUser} className=" text-red-500 text-xl mt-3 mr-1 cursor-pointer">delete my account ?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UserBlog/>
        <div className="p-9 w-[100%] mb-[100px]">
        </div>
    </>)
}
export default User;