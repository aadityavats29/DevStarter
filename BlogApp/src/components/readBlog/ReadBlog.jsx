"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBlog, checkLike, LikeBlog, Bookmark, checkBookmark } from "../api/api";
import { FaShareAlt } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import './readBlog.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadBlog = () => {
    const [details, setDetails] = useState({});
    const [share, setShare] = useState(false);
    const [like, setLike] = useState(false);
    const [bookmark, setBookMark] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [donationAmount, setDonationAmount] = useState("5");
    const { blogId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const BlogDetails = async () => {
            const response = await getSingleBlog(blogId);
            if (response.status && response.status === "success") {
                setDetails(response.Blog);
                setLikeCount(response.Blog.totalLikes);
            }
        };
        BlogDetails();
    }, [blogId]);

    useEffect(() => {
        const checkForLike = async () => {
            const response = await checkLike(blogId);
            if (response.status && response.status === "success") {
                setLike(true);
            }
        };
        const checkForBookmark = async () => {
            const response = await checkBookmark(blogId);
            if (response.status && response.status === "success") {
                setBookMark(true);
            }
        };
        checkForBookmark();
        checkForLike();
    }, [blogId]);

    const copyUrl = async () => {
        setShare(!share);
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        toast.success("URL copied to clipboard!", {
            position: "top-center",
            autoClose: 1000,
            className: "custom-toast",
        });
    };

    const ApplyBookmark = async () => {
        const response = await Bookmark(blogId);
        if (response.status && response.status === "success") {
            setBookMark(response.bookmark);
        }
    };

    const likeOrDislike = async () => {
        const response = await LikeBlog(blogId, details.author._id);
        setLikeCount((prev) => (response.likedBlog ? prev + 1 : prev - 1));
        setLike(response.likedBlog);
    };

    const ReDirect = () => {
        navigate(`/editblog/${details._id}`);
    };

    const handlePayment = async () => {
        const stripe = await loadStripe("pk_test_51QU5IFKSY4fJwSPCG6HxueOoLO5FKMaqAD9L4P9vju3fTCWNf1Jstzpqp1cf3plOLXnEilMy7P9elSoOVXGXnU4200X8vZVyYy");

        const response = await fetch("http://localhost:8092/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: parseInt(donationAmount) * 100 }),
        });

        if (response.ok) {
            const session = await response.json();
            const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
            if (error) console.error("Payment error:", error.message);
        } else {
            console.error("Failed to create checkout session");
        }

        setDialogOpen(false);
    };

    return (
        <>
            <div className="w-[100%] mt-[75px] mb-[100px] flex justify-center">
                <div className="w-[95%] sm:w-[80%] lg:w-[60%] xl:w-[50%] flex flex-col gap-1">
                    <div>
                        {details.image && (
                            <img className="w-[100%] h-[320px] lg:h-[360px] select-none" src={details.image} alt="Blog" />
                        )}
                    </div>
                    <div className="flex gap-1 mt-3 relative">
                        {like ? (
                            <AiFillHeart onClick={likeOrDislike} className="text-[34px] active:scale-75 text-red-500 cursor-pointer" />
                        ) : (
                            <AiOutlineHeart onClick={likeOrDislike} className="text-[34px] active:scale-75 cursor-pointer" />
                        )}
                        <p className="text-[27px] font-normal relative bottom-1 mr-1">{likeCount}</p>
                        <FaShareAlt onClick={copyUrl} className={`text-[25px] relative mt-[3.5px] cursor-pointer ${share ? "text-blue-500" : ""}`} />
                        {details.author && localStorage.getItem("userId") === details.author._id ? (
                            <button
                                onClick={ReDirect}
                                style={{
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: "50%",
                                    padding: "8px",
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    border: "none",
                                    position: "absolute",
                                    right: "4px",
                                }}
                            >
                                <EditIcon style={{ fontSize: "20px", color: "#555" }} />
                            </button>
                        ) : (
                            <div className="absolute right-1">
                                {bookmark ? (
                                    <IoBookmark onClick={ApplyBookmark} className="text-[32px] active:scale-75 text-red-500 cursor-pointer" />
                                ) : (
                                    <IoBookmarkOutline onClick={ApplyBookmark} className="text-[32px] active:scale-75 cursor-pointer" />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-[100%] flex justify-center mb-[40px]">
                        {details.title && (
                            <p className="md:w-[750px] text-[30px] md:text-[60px] text-center font-medium">{details.title}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button onClick={() => setDialogOpen(true)} className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg">
                            Donate Now
                        </button>
                    </div>
                    <div className="width-[100%] flex">
                        <span className="flex-1 border-2 border-cyan-300 h-0 relative top-[30px]"></span>
                        <p className="mr-4 ml-4 text-[40px]">Content</p>
                        <span className="flex-1 border-2 border-cyan-300 h-0 relative top-[30px]"></span>
                    </div>
                    <div className="w-[100%]">
                        {details.data && (
                            <div className="blogPage w-[100%]" dangerouslySetInnerHTML={{ __html: details.data }}></div>
                        )}
                    </div>
                </div>
            </div>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Choose Donation Amount</DialogTitle>
                <DialogContent>
                    <RadioGroup value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)}>
                        {[5, 10, 50, 100, 500].map((amount) => (
                            <FormControlLabel key={amount} value={amount.toString()} control={<Radio />} label={`$${amount}`} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handlePayment} color="primary" variant="contained">
                        Proceed to Pay
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </>
    );
};

export default ReadBlog;
