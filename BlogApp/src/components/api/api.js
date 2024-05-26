import axios from 'axios';
// const url = `http://localhost:8092/api`;
const url = `${window.location.origin}/api`;

export const LoginUser = async (data) => {
    try {
        const response = await axios.post(`${url}/login`, data, {
            timeout: 4000,
        })
        console.log(response);
        if (response.status === 200) {
            return {
                status: response.data.status,
                username: response.data.username,
                email: response.data.email,
                image: response.data.image,
                totalLikes: response.data.totalLikes,
                totalPost: response.data.totalPost,
                token: response.data.token,
                id: response.data.id,
                admin:response.data.admin
            }
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is slow Try Again"
        }
    }
}

export const signUser = async (data) => {
    try {
        const response = await axios.post(`${url}/signin`, data, {
            timeout: 4000,
        })
        console.log(response);
        if (response.status === 201) {
            return {
                status: response.data.status,
                message: response.data.message
            }
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            status: 'fail',
            message: "Internet is slow Try Again"
        }
    }
}

export const createBlogRequest = async (data) => {
    try {
        const response = await axios.post(`${url}/userblog/${localStorage.getItem('userId')}`, data, {
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        })
        if (response.status === 201) {
            return {
                status: response.data.status,
                message: response.data.message
            }
        }
    } catch (error) {
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            status: 'fail',
            message: "Internet is slow Try Again"
        }
    }
}


export const getTypeBlog = async (category,inputValue) => {
    try {
        if(inputValue){
            const response = await axios.get(`${url}/blogs/${category || 'all'}?input=${inputValue}`, {
                timeout: 4000,
            });
            if (response.status === 204) {
                return {
                    status: 'empty',
                    message: 'no data found'
                }
            }
            return {
                status: response.data.status,
                Blogs: response.data.Blogs,
                message: response.data.message
            }
        } else{
            const response = await axios.get(`${url}/blogs/${category || 'all'}`, {
                timeout: 4000,
            });
            if (response.status === 204) {
                return {
                    status: 'empty',
                    message: 'no data found'
                }
            }
            return {
                status: response.data.status,
                Blogs: response.data.Blogs,
                message: response.data.message
            }
        }
        
    } catch (error) {
        console.log("Error while getting all the Blog", error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const getSingleBlog = async (blogId)=>{
    try{
        const response = await axios.get(`${url}/blog/${blogId}`,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        })
        if(response.status && response.status===200){
            return {
                status:response.data.status,
                Blog:response.data.blog
            }
        } else if(response.status && response.status===204){
            return {
                status:'empty',
                message:'No Data Found'
            }
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const checkLike = async (blogId) => {
    try{
        const response = await axios.get(`${url}/liked/${blogId}`, {
            headers: {
                userid:localStorage.getItem('userId'),
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        })
        return {
            status:response.data.status
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const LikeBlog = async (blogId,authorId)=>{
    try{
        const response = await axios.post(`${url}/liked/${blogId}`,{userId:localStorage.getItem('userId'),authorId:authorId},{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        })
        return{
            status:'success',
            likedBlog:response.data.likedBlog
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const Bookmark = async (blogId)=> {
    try{
        const response = await axios.post(`${url}/bookmark/${blogId}`,{userId:localStorage.getItem('userId')},{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        })
        if(response.status && response.status===200){
            return {
                status:response.data.status,
                bookmark:response.data.bookmark,
                message:response.data.message
            }
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const checkBookmark = async (blogId)=>{
    try{ 
        const response = await axios.get(`${url}/bookmark/${blogId}`, {
            headers: {
                userid:localStorage.getItem('userId'),
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        if(response.status && response.status===200){
            return {
                status:response.data.status,
                message:response.data.message,
                bookmark:response.data.bookmark
            }
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const getUserDetails = async ()=>{
    try{
        const response = await axios.get(`${url}/user/${localStorage.getItem("userId")}`, {
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        return {
            status:response.data.status,
            username:response.data.username,
            email:response.data.email,
            image:response.data.image,
            totalLikes:response.data.totalLikes,
            totalPost:response.data.totalPost,
            Bookmark:response.data.Bookmark
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const userBlogs = async ()=>{
    try{
        console.log("reach here");
        const response = await axios.get(`${url}/userblog/${localStorage.getItem('userId')}`,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        return {
            status:response.data.status,
            blogs:response.data.Blogs
        }
    } catch(error){
        console.log("Error while getting user Blog ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const UpdateBlog = async (blogId,data)=>{
    try{
        const response = await axios.put(`${url}/blog/${blogId}`,data,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        if(response.status && response.status===200){
            return {
                status: response.data.status,
                message:response.data.message
            }
        }
    } catch(error){
        console.log("Error while Updating user Blog ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}
export const deleteBlog = async (blogId)=>{
    try{
        const response = await axios.delete(`${url}/blog/${blogId}`,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        if(response.status && response.status===200){
            return {
                status: response.data.status,
                message:response.data.message
            }
        }
    } catch(error){
        console.log("Error while Deleteing user Blog ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}
export const deleteUser = async () => {
    try{
        const response = await axios.delete(`${url}/user/${localStorage.getItem('userId')}`,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        if(response.status && response.status===200){
            return {
                status: response.data.status,
                message:response.data.message
            }
        }
    } catch(error){
        console.log("Error while Deleting the User ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}

export const UpdateUser = async (userData)=>{
    try{
        const response = await axios.put(`${url}/user/${localStorage.getItem('userId')}`,userData,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        if(response.status && response.status===200){
            return {
                status: response.data.status,
                message:response.data.message
            }
        }
    } catch(error){
        console.log("Error while Updating the User ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}
export const getAllBookmarked = async ()=>{
    try{
        console.log("reach here");
        const response = await axios.get(`${url}/getbookmark/${localStorage.getItem('userId')}`,{
            headers: {
                authorization: localStorage.getItem("token")
            },
            timeout: 4000,
        });
        return {
            status:response.data.status,
            blog:response.data.blog
        }
    } catch(error){
        console.log("Error while getting user Blog ",error);
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is Slow try again"
        }
    }
}