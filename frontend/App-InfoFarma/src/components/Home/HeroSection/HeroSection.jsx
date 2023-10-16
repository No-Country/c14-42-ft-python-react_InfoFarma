import { Box, Stack, Typography } from '@mui/material'
import { SearchBar } from './SearchBar'
import { CustomButton } from './CustomButton'

export const HeroSection = () => {

  return (
    <Box  
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        mt: 5,
    }}>
      <Typography variant='h4' component='h1'>InfoFarma</Typography>
      <Typography variant='h6' component='h2'>Aquí encontrarás información y comparación de precios de fármacos</Typography>
      <SearchBar/>
      <Stack sx={{
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        gap: '10px'
      }}>
        <CustomButton text={'Información sobre medicamentos'}/>
        <CustomButton text={'Consulta precios de medicamentos'}/>
      </Stack>
      <Typography>Hemos reunido información sobre medicamentos, patologías, productos de farmacia, para brindarte todos esos conocimientos y más, en una sola página.</Typography>
      <Typography>Encuentra: ¿Para qué sirve? ¿Cuánto cuesta? ¿Qué farmacia es más barata?</Typography>
    </Box>
  )
}