import { useEffect, useState } from "react";
import { userBlogs } from "../api/api";
import ShowBlog from "../Blog/showBlogs";
const UserBlog = ()=>{
    const [blog,setBlog] = useState([]);
    useEffect(()=>{  
        const getUserBlog = async () =>{
            const response = await userBlogs();
            console.log("There is some data");
            console.log(response);
            if(response.status === 'success'){
                setBlog(response.blogs);
            }
        }
        getUserBlog();
    },[]);
    return (<>
        <div className="w-[100%] h-[140px] mb-[50px] mt-[50px] flex justify-center items-center bg-blue-950">
            <div className="text-[30px] sm:text-[65px] ">User Blog</div>
        </div>
        <ShowBlog blog={blog} />
    </>)
}
export default UserBlog;