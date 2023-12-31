import { Container, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';

export const HeroSection = () => {

  return (
    <Container
      maxWidth="100vw"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        pl: { xs: 2, sm: 7 },
        pr: { xs: 2, sm: 7 },
        pt: '7rem',
        pb: '4rem',
      }}
    >
      <Typography variant='h3' component='h1' color='primary' m={1}>
        InfoFarma
      </Typography>
      <SearchBar />
      <Typography fontSize='1.4rem' variant='h5' component='h2' color='primary'>
        Aquí encontrarás información y comparación de precios de medicamentos y productos farmacéuticos en México, todo en una sola página.
      </Typography>
      <Typography fontSize='1.4rem' variant='h5' component='p' color='primary' m={1}>
        Encuentra: ¿Cuánto cuesta? ¿Qué presentaciones hay disponibles? ¿Qué farmacia es más barata?
      </Typography>
    </Container>
  );
};
