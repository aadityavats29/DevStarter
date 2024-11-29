import { Box, styled } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SocialButton = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 50px;
`;

const SocialIcon = styled(Box)`
    cursor: pointer;
    width: 50px;
    height: 50px;
    color: white;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
        color: #f4f4f4; /* Change to a light color or gradient */
        transform: scale(1.1);
    }
    &:active {
        transform: scale(0.9);
    }
`;

const FadeInBox = styled(Box)`
    animation: fadeInFromBottom 1s forwards;
    @keyframes fadeInFromBottom {
        0% {
            opacity: 0;
            transform: translateY(40px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ChangeH2 = styled('h2')`
    color: white;
    font-size: 55px;
    background-image: radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf);
    background-clip: text;
    color: transparent;
    text-align: center;
    font-weight: bold;
    ::selection {
        background-color: transparent;
    }
`;

const ContactUs = () => {
    const openInstagram = () => {
        window.open('https://www.instagram.com/_awkdityaa/profilecard/', '_blank', 'noopener noreferrer');
    };

    const openTwitter = () => {
        window.open('https://x.com/Awkdityaa_', '_blank', 'noopener noreferrer');
    };

    const openLinkedin = () => {
        window.open('https://www.linkedin.com/in/aditya-vats-427635216/', '_blank', 'noopener noreferrer');
    };

    return (
        <Box
            sx={{
                backgroundColor: 'black',
                color: 'white',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <FadeInBox>
                <ChangeH2>Contact Us on Social Media</ChangeH2>
                <SocialButton>
                    <SocialIcon>
                        <InstagramIcon fontSize="large" onClick={openInstagram} />
                    </SocialIcon>
                    <SocialIcon>
                        <TwitterIcon fontSize="large" onClick={openTwitter} />
                    </SocialIcon>
                    <SocialIcon>
                        <LinkedInIcon fontSize="large" onClick={openLinkedin} />
                    </SocialIcon>
                </SocialButton>
            </FadeInBox>
        </Box>
    );
};

export default ContactUs;
