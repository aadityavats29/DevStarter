"use client";
import { useEffect, useState, useRef, useContext } from "react";
import MailIcon from "@mui/icons-material/Mail";
import { FaUser, FaPlus } from "react-icons/fa";
import { IoCodeSlashSharp } from "react-icons/io5";
import "./user.css";
import UserBlog from "./userBlog";
import { getUserDetails, deleteUser, UpdateUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/dataContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from "firebase/storage";
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

    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFileChange = async (e) => {
        try {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (file.size < 2 * 1024 * 1024) {
                    setSelectedFile(file);
                    setImageUrl(URL.createObjectURL(file));
                } else {
                    toast.error("File size exceeds 2MB", { position: "top-center" });
                }
            }
        } catch (err) {
            console.log("Wrong file type");
        }
    };

    const handleSpeedDialClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserDetails();
            if (response.status && response.status === "success") {
                setUser(response);
                setImageUrl(response.image);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (!selectedFile) return;
        const uploadFile = () => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + selectedFile.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setProgress(true);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setProgress(false);
                    toast.error("Image upload failed", { position: "top-center" });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUser({ ...user, image: downloadURL });
                    });
                    setProgress(false);
                }
            );
        };
        uploadFile();
    }, [selectedFile]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const DeleteUser = async () => {
        const response = await deleteUser();
        if (response.status && response.status === "success") {
            toast.success("Your account has been deleted", { position: "top-center" });
            setTimeout(() => {
                navigate("/intro");
                localStorage.clear();
                setAccount(false);
            }, 1000);
        } else if (response.status && response.status === "fail") {
            toast.error(response.message, { position: "top-center" });
        }
    };

    const updatingUser = async () => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_.]{2,19}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!usernameRegex.test(user.username)) {
            toast.error("Invalid username. Use 3-20 characters, starting with a letter. Allowed: letters, numbers, underscores, dots.", {
                position: "top-center",
            });
            return;
        }

        if (!emailRegex.test(user.email)) {
            toast.error("Invalid email format.", { position: "top-center" });
            return;
        }

        const response = await UpdateUser(user);
        if (response.status && response.status === "success") {
            toast.success("Your profile has been updated", { position: "top-center" });
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else if (response.status && response.status === "fail") {
            toast.error(response.message, { position: "top-center" });
        }
    };

    return (
        <>
            <ToastContainer style={{ scale: "0.95", paddingTop: "60px" }} />
            <div className="w-[100%] h-[100vh] flex justify-center items-center">
                <div className="h-[100%] sm:h-[450px] pt-[67px] sm:pt-0 lg:w-[65%] md:w-[75%] sm:w-[95%] w-[100%] flex flex-col sm:flex-row">
                    <div className="flex-1 flex items-center justify-center relative">
                        <img
                            style={{ outline: "3px solid white", outlineOffset: "10px" }}
                            className="w-[250px] h-[250px] rounded-full opacity-85"
                            src={imageUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBQLZBLliHC0oAh1vMfI7Z5IzTV8_RlzVeh6QqSzs_SCqn5a0rkuXEoVsuDPNxMntF0vc&usqp=CAU"}
                            alt=""
                        />
                        {showProgress ? (
                            <CircularProgressbar
                                background
                                backgroundPadding={6}
                                styles={buildStyles({ backgroundColor: "black", textColor: "#fff", pathColor: "#fff", trailColor: "transparent" })}
                                className="w-[70px] absolute h-[70px] p-2 rounded-full cursor-pointer z-10"
                                value={imageFileUploadProgress}
                                text={`${imageFileUploadProgress}%`}
                            />
                        ) : (
                            <>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleFileChange}
                                />
                                <FaPlus onClick={handleSpeedDialClick} className="absolute h-[40px] w-[40px] p-2 rounded-full cursor-pointer bg-slate-500 z-10" />
                            </>
                        )}
                    </div>
                    <div className="flex-1 sm:pt-[25px] flex-col gap-2 flex items-center text-black p-4">
                        <div className="flex justify-center items-center">
                            <p className="text-[40px] mb-4 text-white">Profile Edit</p>
                        </div>
                        <div className="w-[100%]">
                            <div className="relative mb-2">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <FaUser className="text-[22px] text-gray-500" />
                                </div>
                                <input
                                    value={user.username}
                                    onChange={onInputChange}
                                    type="text"
                                    name="username"
                                    className="border text-black border-gray-300 text-lg rounded-lg focus:outline-none block w-full ps-10 p-2.5"
                                    placeholder="Enter Username"
                                    required
                                />
                            </div>

                            {/* yaha dalra hai */}
                            
                            
                        </div>
                        <div className="w-[100%]">
                            <div className="relative mb-4">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 cursor-pointer">
                                    <MailIcon className="text-[24px] text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={onInputChange}
                                    name="email"
                                    className="border text-black border-gray-300 text-lg rounded-lg focus:outline-none block w-full ps-10 p-2.5"
                                    placeholder="Enter Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-[100%] flex flex-col gap-2">
                            <button onClick={() => navigate("/createblog")} className="createBlog">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
                                    </svg>{" "}
                                    Create
                                </span>
                            </button>
                            <button onClick={updatingUser} className="cssbuttons-io pt-2 pb-2">
                                <span>
                                    <IoCodeSlashSharp style={{ fontSize: "25px" }} /> Update
                                </span>
                            </button>
                            <div className="w-[100%] flex justify-end">
                                <p onClick={DeleteUser} className="text-red-500 text-xl mt-3 mr-1 cursor-pointer">
                                    delete my account?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
                    <Tab label="UserBlog" />
                    <Tab label="BookMarked" />
                </Tabs>
            </div>
            {value === 0 ? <UserBlog /> : <BookMark />}
        </>
    );
};

export default User;
