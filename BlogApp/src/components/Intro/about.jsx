import { Box, Typography, Grid, styled } from "@mui/material";
import ProfileImage from './download.jfif';

const ChangeTypo = styled(Typography)`
  background-image: radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf);
  background-clip: text;
  color: transparent;
  font-weight: bolder;
  letter-spacing: 2px;
  ::selection {
    background-color: transparent;
  }
`;

const ProfilePic = styled('img')`
  width: 330px;
  height: 330px;
  border-radius: 50%;
  object-fit: cover;
`;

const FadeInBox = styled(Box)`
  opacity: 0;
  transform: translateY(30px);
  animation: fadeIn 1s forwards ease-in-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const About = () => {
  return (
    <>
      <Grid
        container
        className="md:pl-[50px] md:pr-[100px] h-[95vh]"
        sx={{ paddingTop: '10vh' }}
      >
        <Grid
          item
          lg={5}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FadeInBox>
            <ProfilePic src={ProfileImage} alt="Profile" />
          </FadeInBox>
        </Grid>
        <Grid
          item
          lg={7}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
          }}
        >
          <FadeInBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '550px',
            }}
          >
            <ChangeTypo
              variant="h1"
              sx={{
                textAlign: { xs: 'center', sm: 'center', md: 'left' },
                fontSize: '50px',
                marginBottom: '5px',
              }}
            >
              Chill Guys
            </ChangeTypo>
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontSize: '20px',
                textAlign: 'justify',
                paddingLeft: '15px',
              }}
            >
              A bunch of chill guys adept at building dynamic and scalable web
              applications. Passionate about crafting seamless user experiences
              and solving complex challenges. Chill problem solver.
            </Typography>
          </FadeInBox>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
