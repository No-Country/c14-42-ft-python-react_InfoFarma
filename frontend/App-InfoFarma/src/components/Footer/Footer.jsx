import React from 'react';
import { Container, Paper, Button, TextField, Grid, Typography, Link, } from '@mui/material';
import { IoLogoGithub, IoLogoSlack, IoLogoLinkedin } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import  useEmail  from '../../customHooks/useEmail'
import './Footer.css';


export const Footer = () => {

  const {
    email,
    emailError,
    handleEmailCheck,
    handleSubscribe
  } = useEmail()

  const handleIconClick = (link) => {
    window.location.href = link
  }

  return (
    <Container className="footer-container">
      <Paper elevation={3} square={false} className="footer-paper">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div" gutterBottom>
              Nuestras redes sociales
            </Typography>
            <IconContext.Provider value={{ size: '2em' }}>
              <div className="social-media-icons">
                <Link href='https://github.com/No-Country' color={'inherit'}
                  target='_blank' rel="noopener noreferrer"
                  onClick={() => handleIconClick('https://github.com/No-Country')}>
                  <IoLogoGithub />
                </Link>
                <Link href='https://join.slack.com/t/no-country/shared_invite/zt-23wenaufp-caQgYqwKAsc6Qdjh6uYAbQ' color={'inherit'}
                  target='_blank' rel="noopener noreferrer"
                  onClick={() => handleIconClick('https://join.slack.com/t/no-country/shared_invite/zt-23wenaufp-caQgYqwKAsc6Qdjh6uYAbQ')}>
                  <IoLogoSlack />
                </Link>
                <Link href='https://www.linkedin.com/company/nocountrytalent/' color={'inherit'}
                  target='_blank' rel="noopener noreferrer"
                  onClick={() => handleIconClick('https://www.linkedin.com/company/nocountrytalent/')}>
                  <IoLogoLinkedin />
                </Link>
              </div>
            </IconContext.Provider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="div" gutterBottom>
              Regístrate para recibir noticias y promociones
            </Typography>
            <form onSubmit={handleSubscribe}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    className="form-input"
                    value={email}
                    onChange={handleEmailCheck}
                    error={Boolean(emailError)}
                    helperText={emailError}
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
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Rem dolores quia, expedita quibusdam necessitatibus quaerat distinctio neque voluptates quasi,
          officiis facere id tenetur beatae error sapiente itaque consequuntur dolor facilis?
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
    </Container >
  );
};

