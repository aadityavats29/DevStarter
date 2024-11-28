import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getDownloadURL, ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus } from "react-icons/fa";
import { getSingleBlog, UpdateBlog , deleteBlog} from '../api/api';
import './createBlog.css';

const EditBlog = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [createBlog, setCreateBlog] = useState({});
    const [imageUrl, setImageUrl] = useState('');
    const [details, setDetails] = useState({});
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
    const [showProgress, setProgress] = useState(false);
    const { blogId } = useParams();
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            ["code-block"],
            [{ color: ["red", "#785412", "lime", "#121481", "#5BBCFF", "#FF6500", "#FFF455", "#836FFF", "#0CECDD"] }],
            [{ background: ["red", "#785412", "lime", "#121481", "#5BBCFF", "#FF6500", "#FFF455", "#836FFF", "#0CECDD"] }]
        ]
    };

    const Category = [
        { label: 'Others' },
        { label: 'C++' },
        { label: 'Python' },
        { label: "Java" },
        { label: 'Frontend' },
        { label: 'Backend' },
        { label: 'FullStack' },
    ];

    useEffect(() => {
        if (!selectedFile) return;
        const uploadFile = () => {
            const storage = getStorage(app);
            const FileName = new Date().getTime() + selectedFile.name;
            const storageRef = ref(storage, FileName);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    setProgress(true);
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                }, (error) => {
                    setProgress(false);
                    toast.error("Image Upload Failed", {
                        position: 'top-center'
                    });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setCreateBlog({ ...createBlog, image: downloadURL });
                    });
                    setProgress(false);
                }
            );
        };

        uploadFile();
    }, [selectedFile]);

    useEffect(() => {
        const BlogDetails = async () => {
            const response = await getSingleBlog(blogId);
            console.log("Response is ", response);
            if (response.status && response.status === 'success') {
                setDetails(response.Blog);
                setCreateBlog(response.Blog);
                setImageUrl(response.Blog.image);
            }
        };
        BlogDetails();
    }, [blogId]);

    const handleSpeedDialClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simulate a click on the file input field
        }
    };

    const handleFileChange = async (e) => {
        try {
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (file.size < 2 * 1024 * 1024) {
                    setSelectedFile(file);
                    setImageUrl(URL.createObjectURL(file));
                } else {
                    toast.error("File Size Exceed's 2mb", {
                        position: 'top-center'
                    });
                }
            }
        } catch (err) {
            console.log("Wrong file type");
        }
    };

    const onChangeHandle = (e) => {
        setCreateBlog({ ...createBlog, [e.target.name]: e.target.value });
        console.log(createBlog);
    };

    const onChangeHandleQuill = (content) => {
        setCreateBlog({ ...createBlog, data: content });
        console.log(createBlog);
    };

    const handleCategoryChange = (event, value) => {
        if (value) {
            setCreateBlog({ ...createBlog, category: value.label });
            console.log(createBlog);
        }
    };
    const updateTheBlog = async () => {
        const response = await UpdateBlog(details._id, createBlog);
        if (response.status && response.status === 'success') {
            toast.success("Your Blog is Updated", {
                position: 'top-center'
            });
            setTimeout(() => {
                navigate('/user');
            }, 1000);
        } else if (response.status && response.status === 'fail') {
            toast.error(response.message, {
                position: 'top-center'
            });
        }
    }
    const DeleteBlog = async () => {
        const response = await deleteBlog(details._id);
        if (response.status && response.status === 'success') {
            toast.success("Your Blog is Updated", {
                position: 'top-center'
            });
            setTimeout(() => {
                navigate('/blogs');
            }, 1000);
        } else if (response.status && response.status === 'fail') {
            toast.error(response.message, {
                position: 'top-center'
            });
        }
    }

    return (
        <>
            <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }} />
            <div className='mt-[60px]'>
                <div className="flex justify-center pt-[20px]">
                    <div className="h-[300px] md:h-[320px] w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[50%] relative">
                        <img className={`w-[100%] h-[100%] opacity-80 ${showProgress && 'opacity-25'}`} src={imageUrl || createBlog.image} alt="Blog Image" />
                        {showProgress && (
                            <CircularProgressbar
                                background
                                backgroundPadding={6}
                                styles={buildStyles({ backgroundColor: "black", textColor: "#fff", pathColor: "#fff", trailColor: "transparent" })}
                                className='w-[80px] text-white absolute inset-y-0 left-1/2 top-1/3 transform -translate-x-1/2'
                                value={imageFileUploadProgress}
                                text={`${imageFileUploadProgress}%`}
                            />
                        )}
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <FaPlus onClick={handleSpeedDialClick} style={{ position: 'absolute', bottom: 16, right: 16, borderRadius: '50%', width: '50px', height: '50px', padding: '13px', color: 'white', backgroundColor: '#5755FE', border: '2px solid white', cursor: 'pointer' }} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className="w-[95%] sm:w-[80%] lg:w-[64%] xl:w-[52%] relative p-4 flex flex-col gap-4 mb-[80px]">
                        <div className='flex gap-4 flex-col lg:flex-row'>
                            <div className='flex w-[100%] gap-3'>
                                <Autocomplete
                                    className="flex-1"
                                    label={createBlog.category}
                                    onChange={handleCategoryChange}
                                    options={Category}
                                    renderInput={(params) => <TextField {...params} label={details.category} />}
                                />
                                <button onClick={DeleteBlog} class="bin-button">
                                    <svg
                                        class="bin-top"
                                        viewBox="0 0 39 7"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                        <line
                                            x1="12"
                                            y1="1.5"
                                            x2="26.0357"
                                            y2="1.5"
                                            stroke="white"
                                            stroke-width="3"
                                        ></line>
                                    </svg>
                                    <svg
                                        class="bin-bottom"
                                        viewBox="0 0 33 39"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <mask id="path-1-inside-1_8_19" fill="white">
                                            <path
                                                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                            ></path>
                                        </mask>
                                        <path
                                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                            fill="white"
                                            mask="url(#path-1-inside-1_8_19)"
                                        ></path>
                                        <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                        <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                    </svg>
                                </button>

                                <button onClick={updateTheBlog} className="publish flex-4">Update</button>
                            </div>
                        </div>
                        <input value={createBlog.title} className="text-black text-[22px] border border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-4 p-3.5" name='title' onChange={onChangeHandle} placeholder="Enter Title" required />
                        <textarea rows="5" value={createBlog.description} className="text-black text-[22px] border border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-4 p-3.5" name='description' onChange={onChangeHandle} placeholder="Enter Description" required />
                        <ReactQuill value={createBlog.data} className='min-h-[300px] overflow-visible' name="data" onChange={onChangeHandleQuill} modules={modules} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditBlog;