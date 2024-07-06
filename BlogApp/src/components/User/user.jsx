"use client"
import { useEffect, useState, useRef } from "react";
import MailIcon from '@mui/icons-material/Mail';
import { FaUser } from "react-icons/fa";
import './user.css';
import { IoCodeSlashSharp } from "react-icons/io5"
import { FaPlus } from "react-icons/fa";
import UserBlog from "./userBlog";
import { getUserDetails, deleteUser, UpdateUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import app from "../../firebase";
import BookMark from "./bookMark";

const User = () => {
    const fileInputRef = useRef(null);
    const [user, setUser] = useState({});
    const { setAccount } = useContext(DataContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showProgress, setProgress] = useState(false);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate();
    const handleFileChange = async (e) => {
        try {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (file.size < 2 * 1024 * 1024) {
                    console.log(file);
                    setSelectedFile(file);
                    setImageUrl(URL.createObjectURL(file));
                } else {
                    toast.error("File Size Exceed's 2mb", {
                        position: 'top-center'
                    });
                }
            }
        }
        catch (err) {
            console.log("Wrong file type");
        }
    };
    const handleSpeedDialClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simulate a click on the file input field
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserDetails();
            if (response.status && response.status === 'success') {
                setUser(response);
                setImageUrl(response.image);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        if (!selectedFile) return;
        const uploadFile = () => {
            const storage = getStorage(app);
            const FileName = new Date().getTime() + selectedFile.name;
            const storageRef = ref(storage, FileName);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            uploadTask.on('state_changed',
                (snapshot) => {
                    setProgress(true);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                    console.log(progress);
                }, (error) => {
                    setProgress(false);
                    toast.error("Image Upload Failed", {
                        position: 'top-center'
                    });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUser({ ...user, image: downloadURL });
                        console.log(downloadURL);
                    }
                    );
                    setProgress(false);
                }
            );
        }
        uploadFile();
    }, [selectedFile]);
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const DeleteUser = async () => {
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
    const updatingUser = async () => {
        const response = await UpdateUser(user);
        if (response.status && response.status === 'success') {
            toast.success("Your Blog is Updated", {
                position: 'top-center'
            });
            setTimeout(() => {
                navigate('/');
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
                    <img style={{ outline: '3px solid white', outlineOffset: '10px' }} className="w-[250px] h-[250px] rounded-full opacity-85" src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU'} alt="" />
                    {showProgress?<CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "black",textColor: "#fff",pathColor: "#fff",trailColor: "transparent"})} className='w-[70px] absolute h-[70px] p-2 rounded-full cursor-pointer z-10' value={imageFileUploadProgress} text={`${imageFileUploadProgress}%`} />
                    :
                    <>
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <FaPlus onClick={handleSpeedDialClick} className="absolute h-[40px] w-[40px] p-2 rounded-full cursor-pointer bg-slate-500 z-10" />
                    </>
                    }
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
                    <div className="w-[100%] flex flex-col gap-2">
                        <button onClick={()=>navigate('/createblog')} className="createBlog">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Create
                            </span>
                        </button>
                        <button onClick={updatingUser} className="cssbuttons-io pt-2 pb-2"> <span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><IoCodeSlashSharp style={{ fontSize: '25px' }} /></svg>Update</span></button>
                        <div className="w-[100%] flex justify-end">
                            <p onClick={DeleteUser} className=" text-red-500 text-xl mt-3 mr-1 cursor-pointer">delete my account ?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-center items-center">
            <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                <Tab label="UserBlog" />
                <Tab label="BookMarked"/>
            </Tabs>
        </div>
        
        
        {value==0?<UserBlog />:<BookMark/>}

    </>)
}
export default User;