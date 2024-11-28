import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete';
import { getDownloadURL,ref, getStorage, uploadBytesResumable } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import app from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaPlus } from "react-icons/fa";
import { createBlogRequest } from '../api/api';
import './createBlog.css';


const Blog = {
    title:'',
    data:'',
    category:'',
    description:''
} 

const CreateBlog = () => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [createBlog,setCreateBlog] = useState(Blog);
    const [imageUrl, setImageUrl] = useState(Blog.image);
    const [imageFileUploadProgress,setImageFileUploadProgress] = useState(0);
    const [showProgress,setProgress] = useState(false);
    const navigate = useNavigate();
    
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            ["code-block"],
            [{ color: ["red", "#785412","lime","#121481","#5BBCFF","#FF6500","#FFF455","#836FFF","#0CECDD"] }],
            [{ background: ["red", "#785412","lime","#121481","#5BBCFF","#FF6500","#FFF455","#836FFF","#0CECDD"] }]
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
    useEffect(()=>{
        if (!selectedFile) return;
        const uploadFile = ()=>{
            const storage = getStorage(app);
            const FileName = new Date().getTime() + selectedFile.name;
            const storageRef = ref(storage,FileName);
            const uploadTask = uploadBytesResumable(storageRef,selectedFile);
            uploadTask.on('state_changed',
                (snapshot)=>{
                    setProgress(true);
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                    setImageFileUploadProgress(progress.toFixed(0));
                },(error)=>{
                    setProgress(false);
                    toast.error("Image Upload Failed",{
                        position:'top-center'
                    });
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                        setCreateBlog({...createBlog,image:downloadURL});
                        console.log(downloadURL);
                        console.log(createBlog);
                    }
                );
                    setProgress(false);
                }
            );
        }
        uploadFile();
    },[selectedFile]);

    const handleSpeedDialClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simulate a click on the file input field
        }
    };
    const handleFileChange =async(e) => {
        try{
            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                if (file.size < 2*1024*1024) {
                    console.log(file);
                    setSelectedFile(file);
                    setImageUrl(URL.createObjectURL(file));
                } else{
                    toast.error("File Size Exceed's 2mb",{
                        position:'top-center'
                    });
                }
            }
        }
        catch(err){
            console.log("Wrong file type");
        }
    };
    const onChangeHandle = (e)=>{
        console.log(createBlog);
        setCreateBlog({...createBlog,[e.target.name]:e.target.value});
    }
    const onChangeHandleQuill = (content)=>{
        console.log(createBlog);
        setCreateBlog({...createBlog,data:content});
    }
    
    const handleCategoryChange = (event,value) => {
        if(value){
            setCreateBlog({...createBlog,category:value.label});
        }
    }
    const publish = async ()=>{
        const response = await createBlogRequest(createBlog);
        if(response.status && response.status==='success'){
            toast.success("Your Blog is Created",{
                position:'top-center'
            })
            setTimeout(()=>{
                navigate('/blogs');
            },1000)
        } else if(response.status && response.status==='fail'){
            toast.error(response.message,{
                position:'top-center'
            })
        }
    }
    return (    
        <>
            <ToastContainer style={{scale:'0.95',paddingTop:'60px'}}/>
            <div className=' mt-[60px]'>
                <div className="flex justify-center pt-[20px]">
                    <div className="h-[300px] md:h-[320px] w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[50%] relative">
                        <img className={`w-[100%] h-[100%] opacity-80 ${showProgress && 'opacity-25'}`} src={imageUrl || 'https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg'} alt="Blog Image" />
                        {showProgress && <CircularProgressbar background backgroundPadding={6} styles={buildStyles({ backgroundColor: "black",textColor: "#fff",pathColor: "#fff",trailColor: "transparent"})} className='w-[80px] text-white absolute inset-y-0 left-1/2 top-1/3 transform -translate-x-1/2' value={imageFileUploadProgress} text={`${imageFileUploadProgress}%`} />}
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <FaPlus  onClick={handleSpeedDialClick}  style={{ position: 'absolute', bottom: 16, right: 16,borderRadius:'50%',width:'50px',height:'50px',padding:'13px',color:'white',backgroundColor:'#5755FE',border:'2px solid white',cursor:'pointer'}} />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className=" w-[95%] sm:w-[80%] lg:w-[64%] xl:w-[52%] relative p-4 flex flex-col gap-4 mb-[80px]">
                        <div className='flex gap-4 flex-col lg:flex-row'>
                            <div className='flex w-[100%] gap-3'>
                                <Autocomplete value={createBlog.category} className="flex-1" onChange={handleCategoryChange} options={Category}  renderInput={(params) => (<TextField {...params} label="Select a Category" />)} />
                                <button onClick={publish} className="publish flex-4 "> Publish</button>
                            </div>
                        </div>
                        <input className="text-black text-[22px] border border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-4 p-3.5" name='title' onChange={(e)=>onChangeHandle(e)}  placeholder="Enter Title" required />
                        <textarea rows="5" className="text-black text-[22px] border border-gray-300 text-sm rounded-lg focus:outline-none block w-full ps-4 p-3.5" name='description' onChange={(e)=>onChangeHandle(e)}  placeholder="Enter Description" required />
                        <ReactQuill  className='min-h-[300px] overflow-visible' name="data" onChange={onChangeHandleQuill} modules={modules}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateBlog;