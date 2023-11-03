import { Container, Box, Typography } from '@mui/material';

export const Info = () => {
  return (
    <Container
      maxWidth="100vw"
      sx={{
        bgcolor: '#55804F',
        pt: 7,
        pb: 7,
        textAlign: 'center',
        placeItems: 'center'
      }}
    >
      <Box>
        <Typography variant='h4' component='h2' p={2} color='#fff'>¿Qué es InfoFarma?</Typography>
        <Typography variant='h4' component='h2' pb={3} color='#fff'>¿Cómo funciona?</Typography>
      </Box>
      <Box>
        <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.4rem'>
          InfoFarma es una aplicación que ofrece información sobre medicamentos, sus precios y presentaciones, recopilada por nuestros desarrolladores desde sitios web confiables.
        </Typography>
        <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.4rem'>
          En nuestra web se pueden comparar precios de los medicamentos generales y con receta en distintas farmacias, para que puedas decidir cuál es el más conveniente y cercano.
        </Typography>
        <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.6rem'>
          ¡Tu salud y comodidad es lo más importante!
        </Typography>
      </Box>
    </Container>
  )
}
