import React from 'react';
import { Container, Paper, Button, TextField, Grid, Typography, Link, } from '@mui/material';
import { IoLogoGithub, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import './Footer.css';


export const Footer = () => {

  return (
    <Container className="footer-container">
      <Paper elevation={3} square={false} className="footer-paper">
        <Grid container spacing={4}>
          {/* Social Media Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div" gutterBottom>
              Nuestras redes sociales
            </Typography>
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="social-media-icons">
                <IoLogoGithub />
                <IoLogoFacebook />
                <IoLogoInstagram />
                <IoLogoLinkedin />
              </div>
            </IconContext.Provider>
          </Grid>

          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div" gutterBottom>
              Regístrate para recibir noticias y promociones
            </Typography>
            <form>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    label="Email address"
                    variant="outlined"
                    fullWidth
                    className="form-input"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    variant="outlined"
                    color="inherit"
                    className="subscribe-button"
                  >
                    Suscríbete
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>

        {/* Text Section */}
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          distinctio earum repellat quaerat voluptatibus placeat nam, commodi
          optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi
          voluptate quas.
        </Typography>

        {/* Links Section */}
        <div className="links-container">
          {[...Array(2)].map((_, index) => (
            <div key={index}>
              <Typography variant="h6" component="div" gutterBottom>
              Colaboradores  
              </Typography>
              <ul className="list">
                {[...Array(5)].map((_, subIndex) => (
                  <li key={subIndex}>
                    <Link href="#!" color="inherit">
                      Link {subIndex + 1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Paper>

      {/* Copyright Section */}
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        className="copyright"
      >
        © 2023 Copyright:
        <Link href="https://www.nocountry.tech/" color="inherit">
          nocountry.tech
        </Link>
      </Typography>
    </Container>
  );
};

