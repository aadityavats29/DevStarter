"use client"
import BlogCard from "./card";
import { Box, styled } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
const CardContainer = styled(Box)`
    border-radius:10px;
    width:100%;
    height:100%;
    padding:15px;
    gap:25px;
    grid-template-columns: auto auto auto auto;
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
const NoContent = () => {
    const [dataFound,setDataFound] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDataFound(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="w-[100%] h-[75vh] flex justify-center items-center">
                <div>
                    {dataFound?<CircularProgress/>:<p className="text-white relative bottom-[10px] text-[40px] tracking-wide">No Data Found</p>}
                </div>
            </div>
        </>
    );
};
const ShowBlog = ({ blog }) => {

    return (<>
        {blog.length === 0 ?
            <>
                <NoContent/>
            </> :
            <div className="w-[100%] min-h-[500px] mt-[3rem] flex justify-center">
                <CardContainer sx={{ position: 'relative', display: 'grid', padding: '20px' }}>
                    {
                        blog.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))
                    }
                </CardContainer>
            </div>
        }

    </>)
}
export default ShowBlog;