"use client"
import BlogCard from "./card";
import { Box,styled } from "@mui/material";
const CardContainer = styled(Box)`
    border-radius:10px;
    width:100%;
    height:100%;
    padding:15px;
    gap:25px;
    grid-template-columns: auto auto auto auto auto;
    @media (max-width: 1600px) {
        grid-template-columns: auto auto auto auto;
    }
    @media (max-width: 1300px) {
        grid-template-columns: auto auto auto;
    }
    @media (max-width: 1000px) {
        grid-template-columns: auto auto;
    }
    @media (max-width: 700px) {
        grid-template-columns: auto;
        gap:10px;
    }
    @media(min-height:900px){
        grid-template-rows: auto auto auto;
    }
    @media(min-height:400px){
        grid-template-rows: auto auto auto;
    }
`;
const ShowBlog = ({blog})=>{
    return (<>
        <div className="w-[100%] min-h-[500px] mt-[3rem] flex justify-center">
            <CardContainer  sx={{position:'relative',display:'grid',padding:'20px' }}>
                {
                    blog.map((item,index)=>(
                        <BlogCard key={index} item={item}/>
                    ))
                }
            </CardContainer>
        </div>
    </>)
}
export default ShowBlog;