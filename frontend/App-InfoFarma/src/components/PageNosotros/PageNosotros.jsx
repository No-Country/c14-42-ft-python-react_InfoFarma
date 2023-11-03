import { Button, Box, Grid, Typography } from '@mui/material'
import styled from "@emotion/styled";

import { IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { Footer } from "../Footer/Footer"

import { useState } from 'react'
import { AvisoResp } from '../AvisoResp/AvisoResp'

const PageNosotros = () => {
  // const [dialogOpen, setDialogOpen] = useState(false)

  // const handleOpenDialog = () => {
  //   setDialogOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setDialogOpen(false);
  // };

  const Img = styled.img`
  width: 6rem;
  height: auto;
  margin-bottom: 0rem;
  border-radius: 20px;
`;

  return (
    <Box>
      <Grid container spacing={3} sx={{
          marginTop: 4,
          padding: '4rem 1rem 2rem 2.5rem',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#dcf1dc64',
      }}>
        {team.map((member) => {
          return (
            <Box sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
                borderRadius: 5,
                padding: 2,
                bgcolor: '#fff',
                m: 2,
                ml: {xs: .5, sm: 1.2},
                minWidth: '200px',
                maxWidth: '200px',
                minHeight: '300px',
                maxHeight: '300px',
              }}>
                <Box sx={{
                  m: 4
                }}>
                  <Img alt="Imagen" src={member.img} />
                <Typography variant="h5" display={'flex'} alignContent={'center'} justifyContent={'center'} mt={1.5}>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" display={'flex'} alignContent={'center'} justifyContent={'center'} mb={.5} >
                  {member.rol}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
                >
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button>
                      <IconContext.Provider value={{ size: "2em" }}>
                        <IoLogoLinkedin />
                      </IconContext.Provider>
                    </Button>
                  </a>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <Button>
                      <IconContext.Provider value={{ size: "2em" }}>
                        <IoLogoGithub />
                      </IconContext.Provider>
                    </Button>
                  </a>
                </Box>
                </Box>
            </Grid >
            </Box>
          )          
        })
        }
      </Grid>
      <Footer/>
    </Box>
  )
}

export default PageNosotros;

const team = [
  {
    name: 'Malvina',
    linkedin: 'https://www.linkedin.com/in/malvina-christiansen/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/Malvina989',
    rol: 'QA Tester',
    img:'/img/malvina.jpg'
  },
  {
    name: 'Federico',
    linkedin: 'https://www.linkedin.com/in/fedeoriglia/',
    github: 'https://github.com/FedeOriglia',
    rol: 'QA Tester',
    img:'/img/federico.jpg'
  },
  {
    name: 'Jareth',
    linkedin: 'https://www.linkedin.com/in/jareth-guerrero-803361272/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    github: 'https://github.com/JarethGuerrero',
    rol: ' Dev FrontEnd',
    img:'/img/jareth.jpg'
  },
  {
    name: 'Ignacio',
    linkedin: 'https://www.linkedin.com/in/ignacio-marucco/',
    github: 'https://github.com/IgnacioMarucco',
    rol: 'Dev FrontEnd',
    img:'/img/ignacio.jpg'
  },
  {
    name: 'Melina',
    linkedin: 'https://www.linkedin.com/in/melina-sosa-fuch-1a7376207/',
    github: 'https://github.com/MelinaFuch',
    rol: 'Dev FrontEnd',
    img:'/img/melina.jpg'
  },
  {
    name: 'Jonathan',
    linkedin: 'https://www.linkedin.com/in/jonathan-diaz-olivares-full-stack-developer-jr/',
    github: 'https://github.com/JonathanDiz',
    rol: 'Dev BackEnd',
    img:'/img/jonathan.jpg'
  },
  {
    name: 'Josué',
    linkedin: '',
    github: 'https://github.com/slorg4',
    rol: 'Dev BackEnd',
    img:'/img/josue.jpg'
  },
  {
    name: 'Camilo',
    linkedin: 'https://www.linkedin.com/in/camilo-zapata-web-dv',
    github: 'https://github.com/ZapataCamilo',
    rol: 'Dev BackEnd',
    img:'/img/camilo.jpg'
  },
]