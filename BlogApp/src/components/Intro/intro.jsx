import { Grid, styled, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import { FaFileCode } from "react-icons/fa";
import { FaJs } from "react-icons/fa";
import { FaAngular } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import { BiSolidDonateHeart } from "react-icons/bi";





const ChangeH2 = styled('h2')`
    color: white;
    font-size: 65px;
    margin-bottom:0px;
    background-image: radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf);
    background-clip: text;
    color: transparent;
    ::selection {
        background-color: transparent;
    }
`;

const ChangeP = styled('p')`
    color: white;
    font-size: 20px;
    margin-top: 10px;
`;

const AnimateGrid = styled(Box)`
    min-width: 380px;
    max-width:100%;
    animation: fadeInFromBottom 1s forwards;
    position: relative;
    @keyframes fadeInFromBottom {
        0% {
            opacity: 0;
            top: 40px;
        }
        100% {
            opacity: 1;
            top: -10px;
        }
    }
`;

const EditLinkedInIcon = styled(LinkedInIcon)`
    width: 40px;
    height: 40px;
    cursor: pointer;
    :hover {
        scale: 1.05;
    }
    :active {
        scale: 0.95;
    }
`;

const ScrollTrack = styled(Box)`
    height: 4.5px;
    position: fixed;
    left: 0px;
    width: 100%;
    transform-origin: left;
    scale: 0 1;
    background-color: white;
    animation: scroll-watch linear;
    animation-timeline: scroll();
    @keyframes scroll-watch {
        to {
            scale: 1 1;
        }
    }
    background: rgb(174, 58, 180);
    background: linear-gradient(90deg, rgba(174, 58, 180, 1) 0%, rgba(253, 64, 29, 1) 61%, rgba(252, 176, 69, 1) 100%);
`;

const Intro = () => {
    const navigate = useNavigate();

    return (
        <>
            <ScrollTrack sx={{ top: { sm: '64px', xs: '56px' }, zIndex: '3' }}></ScrollTrack>
            <Grid 
            className='flex justify-center items-center'
            container style={{ backgroundColor: 'black' }}>
                <Grid
                    style={{
                        minHeight: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                    item
                >
                    {/* <Box 
                    className='border border-yellow-600 flex justify-between overflow-hidden'
                    style={{ maxWidth: { sm: '400px', xs: '350px' } }}>
                    <div className='flex border border-white '>

                        <AnimateGrid
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                // alignItems: 'center',
                            }}
                        >
                            <ChangeH2
                                sx={{
                                    // textAlign: 'center',
                                    fontSize: { xs: '50px', sm: '65px' },
                                    fontWeight: 'bold',
                                }}
                            >
                                Kickstart your DevJourney Today!
                            </ChangeH2>
                            <ChangeP>with DevStarter</ChangeP>
                        </AnimateGrid>
                            {/* <div className='text-wrap flex flex-row'>
                                lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 lorem30 
                            </div> 

                    </div>
                        <img src='pngegg.png' className='h-13 w-13'/>


                    </Box> */}


                <div className='flex justify-center items-center flex-col '>
                    <div >
                    <AnimateGrid>
                        <ChangeH2 >
                        Kickstart Your Journey Today!
                        </ChangeH2>
                    </AnimateGrid>
                    </div>
                    <AnimateGrid>
                        <div className='text-3xl  text-center w-3/4 ml-64'>
                        DevStarter is a platform designed to empower fresh developers by providing a curated collection of DIY project ideas, resources, and tools to enhance their coding skills and portfolio.
                        </div>
                    {/* <div className='w-[100%]'>
                        <img src='pngegg.png' className='h-13 w-13 border border-white w-[100%] absolute' />
                    </div> */}
                    </AnimateGrid>
                </div>



              

                    {localStorage.getItem('userId') && (
                        <Box
                            onClick={() => {
                                navigate(`/blogs`);
                            }}
                            style={{
                                width: '230px',
                                borderRadius: '20px',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '60px',
                                backgroundColor: 'cyan',
                                position: 'absolute', // Position the button
                                bottom: '20px', // Move to the bottom of the viewport
                                left: '50%', // Center horizontally
                                transform: 'translateX(-50%)', // Adjust for centering
                            }}
                        >
                            <Box style={{ fontSize: '20px' }}>Create Blogs</Box>
                        </Box>
                    )}
                </Grid>
                {/* <div className='w-[100%] flex-col items-center'>
                    <div className='border flex justify-center'>
                    What will YOu get from Our website
                    </div>
                    <div className='flex justify-between items-center border w-5/6'>
                        <div>
                        <FaFileCode />
                        </div>
                        <div>
                        <FaJs />
                        </div>
                        <div>
                        <FaFileCode />
                        </div>
                    </div>

                </div> */}

            </Grid>
        </>
    );
};

export default Intro;
