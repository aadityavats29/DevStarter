import { Grid, styled, Box } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';

const ChangeH2 = styled('h2')`
    color: white;
    font-size: 55px;
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
            <Grid container style={{ backgroundColor: 'black' }}>
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
                    <Box style={{ maxWidth: { sm: '400px', xs: '350px' } }}>
                        <AnimateGrid
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ChangeH2
                                sx={{
                                    textAlign: 'center',
                                    fontSize: { xs: '50px', sm: '65px' },
                                    fontWeight: 'bold',
                                }}
                            >
                                Kickstart your DevJourney Today!
                            </ChangeH2>
                            <ChangeP>with DevStarter</ChangeP>
                        </AnimateGrid>
                    </Box>
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
            </Grid>
        </>
    );
};

export default Intro;
