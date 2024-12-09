"use client";
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
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import './readBlog.css';

const ReadBlog = () => {
    const [details, setDetails] = useState({});
    const [share, setShare] = useState(false);
    const [like, setLike] = useState(false);
    const [bookmark, setBookMark] = useState(false);
    const { blogId } = useParams();
    const [likeCount, setLikeCount] = useState(0);
    const [clickLike, setClickike] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const BlogDetails = async () => {
            const response = await getSingleBlog(blogId);
            if (response.status && response.status === 'success') {
                setDetails(response.Blog);
                setLikeCount(response.Blog.totalLikes);
            }
        };
        BlogDetails();
    }, [blogId]);

    useEffect(() => {
        const checkForLike = async () => {
            const response = await checkLike(blogId);
            if (response.status && response.status === 'success') {
                setLike(true);
                setClickike(false);
            }
        };
        const checkForBookmart = async () => {
            const response = await checkBookmark(blogId);
            if (response.status && response.status === 'success') {
                setBookMark(true);
            }
        };
        checkForBookmart();
        checkForLike();
    }, []);

    const copyUrl = async () => {
        setShare(!share);
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
    };

    const ApplyBookmark = async () => {
        const response = await Bookmark(blogId);
        if (response.status && response.status === 'success') {
            setBookMark(response.bookmark);
        }
    };

    const likeOrDislike = async () => {
        const response = await LikeBlog(blogId, details.author._id);
        setClickike(!clickLike);
        clickLike ? setLikeCount(likeCount + 1) : setLikeCount(likeCount - 1);
        if (likeCount < 0) {
            setLikeCount(0);
        }
        if (response.status && response.status === 'success') {
            setLike(response.likedBlog);
        }
    };

    const ReDirect = () => {
        navigate(`/editblog/${details._id}`);
    };

    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51QU5IFKSY4fJwSPCG6HxueOoLO5FKMaqAD9L4P9vju3fTCWNf1Jstzpqp1cf3plOLXnEilMy7P9elSoOVXGXnU4200X8vZVyYy");
    
        // Fetch the checkout session ID from your server
        const response = await fetch('http://localhost:8092/create-checkout-session', {
            method: 'POST',
        });
    
        if (response.ok) {
            const session = await response.json(); 
    
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });
    
            if (error) {
                console.error("Payment error:", error.message);
            }
        } else {
            console.error('Failed to create checkout session');
        }
    };

    return (
        <>
            <div className="w-[100%] mt-[75px] mb-[100px] flex justify-center">
                <div className="w-[95%] sm:w-[80%] lg:w-[60%] xl:w-[50%] flex flex-col gap-1">
                    <div>
                        {details.image && <img className="w-[100%] h-[320px] lg:h-[360px] select-none" src={details.image} alt="#image" />}
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
                        <p className="text-[27px] font-normal relative bottom-1 mr-1">{likeCount}</p>
                        <FaShareAlt onClick={copyUrl} className={`text-[25px] relative mt-[3.5px] transition duration-200 cursor-pointer ${share ? 'text-blue-500' : ''}`} />
                        {details.author && localStorage.getItem('userId') === details.author._id ? (
                            <div className="absolute right-[4px] md:right-[6px] bottom-[3px]">
                                <div className="flex gap-3">
                                    <button className="button" onClick={ReDirect}>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path>
                                            </svg> Edit
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="absolute right-1">
                                {bookmark ? (
                                    <IoBookmark
                                        onClick={ApplyBookmark}
                                        className='text-[32px] active:scale-75 text-red-500 cursor-pointer'
                                    />
                                ) : (
                                    <IoBookmarkOutline
                                        onClick={ApplyBookmark}
                                        className='text-[32px] active:scale-75 cursor-pointer'
                                    />
                                )}
                            </div>
                        )}
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

                    {/* "Donate Now" Button */}
                    <div className="flex justify-center">
                        <button onClick={makePayment} className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg">
                            Donate Now
                        </button>
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
        </>
    );
};

export default ReadBlog;
