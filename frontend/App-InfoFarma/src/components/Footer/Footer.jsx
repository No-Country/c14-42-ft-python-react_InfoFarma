import { useState } from 'react';
import { Container, Paper, Button, TextField, Grid, Typography, Link, Snackbar, Slide } from '@mui/material';
import { IoLogoGithub, IoLogoSlack, IoLogoLinkedin } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import useEmail from '../../hooks/customHooks/useEmail'
import './Footer.css';

export const Footer = () => {

  //Lógica formulario
  const {
    email,
    emailError,
    emailSuccess,
    handleEmailCheck,
    handleSubscribe
  } = useEmail()

  //Lógica del SnackBar
  const [snack, setSnack] = useState(false)

  const handleSnackClose = () => {
    setSnack(false)
  }
  const handleSnackOpen = () => {
    setSnack(true)
  }
  const isSnackbarOpen = (emailSuccess, snack) => {
    return typeof emailSuccess === "boolean" && typeof snack === "boolean" && emailSuccess && snack;
  };


  const handleIconClick = (url) => {
    window.open = (url, '_blank')
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
                    onClick={handleSnackOpen}
                  >
                    Suscríbete
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          className="copyright"
        >
          © 2023 Copyright:
          <Link href="https://www.nocountry.tech/" target='_blank' rel="noopener noreferrer" color="inherit">
            nocountry.tech
          </Link>
        </Typography>

      </Paper>

      <Snackbar
        open={isSnackbarOpen(emailSuccess, snack)}
        autoHideDuration={2200}
        onClose={handleSnackClose}
        message="¡Registro exitoso!"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "left" }}
      />
    </Container >
  );
};

