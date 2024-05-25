import { useEffect, useState } from "react"
import { getTypeBlog } from "../api/api";
import { IoCodeSlashSharp } from "react-icons/io5"
import { useNavigate,useSearchParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ShowBlog from "./showBlogs";
import './blog.css';


const Blog = () => {
    const [type,setType] = useState();
    const [inputValue,setInputValue] = useState('');
    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();

    const Category = [
        { label: 'All Latest Blog' },
        { label: 'Technology and Gadgets' },
        { label: 'Travel and Adventure' },
        { label: 'Business and Finance' },
        { label: 'Education and Learning' },
        { label: "Entertainment and Media" },
        { label: 'Science and Nature' },
        { label: 'Health and Fitness' },
        { label: 'Food and Cooking' },
    ];


    useEffect(() => {
        const fetchData = async () => {
            console.log(type);
            if(type!='All Latest Blog'){
                const response = await getTypeBlog('all',inputValue);
                if (response.status && response.status === 'success') {
                    setBlog(response.Blogs);
                } else if (response.status && response.status === 'success') {
                    setBlog(response.Blogs);
                } else{
                    setBlog([]);
                }
            } else{
                const response = await getTypeBlog('all');
                console.log(type==='All Latest Blog');
                if (response.status && response.status === 'success') {
                    setBlog(response.Blogs);
                } else if (response.status && response.status === 'success') {
                    setBlog(response.Blogs);
                } else{
                    setBlog([]);
                }
            }    
        }
        fetchData();
    }, [inputValue]);

    const onInputTypeChange = (event,value)=>{
        if(value){
            setType(value.label);
        } else{
            setType('All Latest Blog');
        }
    }

    const navigateCreateBlog = ()=>{
        setTimeout(()=>{
            navigate(`/createblog`);
        },300);
    }


    return (
        <>
            <div className="mt-[80px]">
                <div className="flex justify-center">
                    <div className="w-[100%] md:w-auto flex justify-around gap-4 pl-[30px] pr-[30px] md:gap-[60px] flex-col md:flex-row ">
                        <Autocomplete freeSolo inputValue={inputValue} onChange={onInputTypeChange} onInputChange={(event,newValue)=>{setInputValue(newValue);setType('')}} options={Category} className="md:w-[400px] " renderInput={(params) => (<TextField {...params} label="Select a Category" />)} />
                        <button onClick={navigateCreateBlog} className="cssbuttons-io pt-2 pb-2"> <span><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><IoCodeSlashSharp style={{fontSize:'25px'}}/></svg>Create</span></button>
                    </div>  
                </div>
            </div>
            <ShowBlog blog={blog}/>
        </>
    )
}
export default Blog;