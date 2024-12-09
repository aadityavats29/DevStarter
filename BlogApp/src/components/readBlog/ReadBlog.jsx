"use client"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../api/api";
import { FaShareAlt } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { checkLike, LikeBlog, Bookmark, checkBookmark } from "../api/api";
import { useNavigate } from "react-router-dom";
import './readBlog.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ReadBlog = () => {
    const [details, setDetails] = useState({});
    const [share, setShare] = useState(false);
    const [like, setLike] = useState(false);
    const [bookmark, setBookMark] = useState(false);
    const { blogId } = useParams();
    const [likeCount,setLikeCount] = useState(0);
    const [clickLike,setClickike] = useState(true);
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




    useEffect(() => {
        const BlogDetails = async () => {
            const response = await getSingleBlog(blogId);
            if (response.status && response.status === 'success') {
                setDetails(response.Blog);
                console.log(response.Blog);
                setLikeCount(response.Blog.totalLikes);
            }
        }
        BlogDetails();
    }, [blogId]);

    useEffect(() => {
        const checkForLike = async () => {
            const response = await checkLike(blogId);
            if (response.status && response.status === 'success') {
                setLike(true);
                setClickike(false);
            }
        }
        const checkForBookmart = async () => {
            const response = await checkBookmark(blogId);
            if (response.status && response.status === 'success') {
                setBookMark(true);
            }
        }
        checkForBookmart();
        checkForLike();
    }, [])

    const copyUrl = async () => {
        setShare(!share);
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'custom-toast'});

    }
    const ApplyBookmark = async () => {
        const response = await Bookmark(blogId);
        if (response.status && response.status === 'success') {
            setBookMark(response.bookmark);
        }
    }
    const likeOrDislike = async () => {
        const response = await LikeBlog(blogId,details.author._id);
        setClickike(!clickLike);
        clickLike ? setLikeCount(likeCount + 1):setLikeCount(likeCount - 1);
        if(likeCount<0){
            setLikeCount(0);
        }
        if (response.status && response.status === 'success') {
            setLike(response.likedBlog);
        }
    }
    const ReDirect = () => {
        navigate(`/editblog/${details._id}`);
    }
    
    

    return (
        <>
        {/* <ToastContainer style={{ scale: '0.95', paddingTop: '60px' }}/> */}
        <div className="w-[100%] mt-[75px] mb-[100px] flex justify-center">
            <div className="w-[95%] sm:w-[80%] lg:w-[60%] xl:w-[50%] flex flex-col gap-1">
                <div>
                    {details.image && <img className="w-[100%] h-[320px] lg:h-[360px] select-none" src={details.image} alt="#image" />}
                </div>
                <div>
                    
                </div>
                <div className="flex gap-1 mt-3 relative">
                    {like ? (
                        <AiFillHeart
                            onClick={likeOrDislike}
                            className='text-[34px] active:scale-75 text-red-500 cursor-pointer'
                        />
                    ) : (
                        <AiOutlineHeart
                            onClick={likeOrDislike}
                            className='text-[34px] active:scale-75 cursor-pointer'
                        />
                    )}
                    {details.title && <p className="text-[27px] font-normal relative bottom-1 mr-1">{likeCount}</p>}

                    <div>
                    <FaShareAlt onClick={copyUrl} className={`text-[25px] relative mt-[3.5px] transition duration-200 cursor-pointer ${share ? 'text-blue-500' : ''}`} />
                    <ToastContainer />
                    </div>


                    {
                        details.author && localStorage.getItem('userId') === details.author._id ?
                            <>
                                <div className="absolute right-[4px] md:right-[6px] bottom-[3px]">
                                    <div className="flex gap-3">
                                        <button className="button" onClick={ReDirect}>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg> Edit
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </> :
                            <>
                                {bookmark ? (
                                    <IoBookmark
                                        onClick={ApplyBookmark}
                                        className='text-[32px] active:scale-75 text-red-500 cursor-pointer absolute right-1'
                                    />
                                ) : (
                                    <IoBookmarkOutline
                                        onClick={ApplyBookmark}
                                        className='text-[32px] active:scale-75 cursor-pointer absolute right-1'
                                    />
                                )}
                            </>
                    }

                </div>
                <div className="w-[100%] flex justify-center mb-[40px]">
                    {details.title && <p className="md:w-[750px] text-[30px] md:text-[60px] text-center font-medium">{details.title.substring(0, 90)}</p>}
                </div>
                <div className="flex justify-center gap-1 w-[100%] mb-10">
                    <div className="flex gap-9">
                        {details.author && <Avatar sx={{ height: '70px', width: '70px' }} alt={details.author.username} src={details.author.image} />}
                        <div className="flex flex-col">
                            {details.author && <p className="text-[30px]">{details.author.username}</p>}
                            <div className="flex gap-3">
                                <div>
                                    {details.author && <p className="flex-1 text-[14px]">Total Post : {details.author.totalPost}</p>}
                                </div>
                                <div>
                                    {details.author && <p className="flex-1 text-[14px]">Total Likes : {details.author.totalLikes}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="width-[100%]] flex">
                    <span className="flex-1 border-2 border-cyan-300 h-0 relative top-[30px]"></span>
                    <p className="mr-4 ml-4 text-[40px]">Content</p>
                    <span className="flex-1 border-2 border-cyan-300 h-0 relative top-[30px]" ></span>
                </div>
                <div className="w-[100%]">
                    {
                        details.data && <div className="blogPage w-[100%] " dangerouslySetInnerHTML={{ __html: details.data }}></div>
                    }
                </div>
            </div>
        </div>
    </>)
}
export default ReadBlog;