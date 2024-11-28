import { Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { checkLike, LikeBlog, Bookmark, checkBookmark } from '../api/api';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Blogcard = ({ item }) => {
    const [like, setLike] = useState(false);
    const [bookmark, setBookMark] = useState(false);

    useEffect(() => {
        const checkForLike = async () => {
            const response = await checkLike(item._id);
            if (response.status && response.status === 'success') {
                setLike(true);
            }
        };
        const checkForBookmart = async () => {
            const response = await checkBookmark(item._id);
            if (response.status && response.status === 'success') {
                setBookMark(true);
            }
        };
        checkForBookmart();
        checkForLike();
    }, []);

    const ApplyBookmark = async () => {
        const response = await Bookmark(item._id);
        if (response.status && response.status === 'success') {
            setBookMark(response.bookmark);
        }
    };

    const likeOrDislike = async () => {
        const response = await LikeBlog(item._id, item.author);
        if (response.status && response.status === 'success') {
            setLike(response.likedBlog);
        }
    };

    const navigate = useNavigate();
    const openBlogPage = () => {
        navigate(`/blog/${item._id}`);
    };
    const EditPage = () => {
        navigate(`/editblog/${item._id}`);
    };

    return (
        <Card
            sx={{ borderRadius: '7px' }}
            className='min-w-[300px] max-w-[350px] relative h-[400px] text-black border-2 bg-white'
        >
            <div onClick={openBlogPage} className='cursor-pointer'>
                <p className='m-2'>{item.category}</p>
                <div className='flex justify-center'>
                    <img
                        className='w-[100%] h-[160px] rounded-lg ml-3 mr-3 border-2'
                        src={item.image}
                    />
                </div>
                <div className='m-2 mt-2'>
                    <p className='text-[19px] h-[60px] mb-1 overflow-hidden'>{item.title}</p>
                    <p className='text-[14px]'>{item.description.substring(0, 120)}?&nbsp;....</p>
                </div>
            </div>
            <div className='flex justify-around w-[70px] absolute bottom-3 left-[7px]'>
                {like ? (
                    <AiFillHeart
                        onClick={likeOrDislike}
                        className='text-[30px] active:scale-75 text-red-500 cursor-pointer'
                    />
                ) : (
                    <AiOutlineHeart
                        onClick={likeOrDislike}
                        className='text-[30px] active:scale-75 cursor-pointer'
                    />
                )}
            </div>
            <div className='absolute bottom-[45px] right-2'>
                {localStorage.getItem('userId') === item.author || localStorage.getItem('admin') === 'true' ? (
                    <>
                        <EditNoteIcon
                            onClick={EditPage}
                            sx={{ fontSize: '38px' }}
                            className='active:scale-75 cursor-pointer absolute right-[-4px] bottom-[-35px]'
                        />
                    </>
                ) : (
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
                )}
            </div>
        </Card>
    );
};
export default Blogcard;
