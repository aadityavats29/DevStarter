import { useEffect, useState } from "react";
import { getAllBookmarked } from "../api/api";
import ShowBlog from "../Blog/showBlogs";

const BookMark = ()=>{
    const [blog,setBlog] = useState([]);
    useEffect(()=>{  
        const getUserBlog = async () =>{
            const response = await getAllBookmarked();
            if(response.status === 'success'){
                setBlog(response.blog);
            }
        }
        getUserBlog();
    },[]);
    return (<>
        <ShowBlog blog={blog} />
    </>)
}
export default BookMark;