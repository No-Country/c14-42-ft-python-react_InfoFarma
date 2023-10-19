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
          <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.4rem'>InfoFarma es una guía y un directorio médico que ofrece información sobre medicamentos y padecimientos, recopilada por nuestros desarrolladores desde sitios web confiables, basados en guías escritas por médicos acreditados en cada descripción</Typography>
          <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.4rem'>Además, en nuestra web se pueden comparar precios de los medicamentos generales y con receta, ofreciendo el más conveniente y cercano a vos.</Typography>
          <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.4rem'>En nuestro buscador encontrarás guías escritas por médicos acreditados y uso de más de 900 medicamentos y productos disponibles en las farmacias y laboratorios más populares de nuestro país.</Typography>
          <Typography variant='h5' component='h3' p={2} color='#fff' fontSize='1.6rem'>¡Tu salud es lo más importante!</Typography>
        </Box>
      </Container>
  )
}
