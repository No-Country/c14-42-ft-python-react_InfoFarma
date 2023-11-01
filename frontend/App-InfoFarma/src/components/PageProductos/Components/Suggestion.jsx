import { LinearProgress, Box, Typography, Link } from '@mui/material';
import { CustomButton } from '../../Home/HeroSection/CustomButton';
import { display } from '@mui/system';

function Suggestion() {
  return (
    <Box sx={{
        p: [0, '1rem'],
        display: 'flex',
        justifyContent: 'center',
        color: '#575c54',
        mb: 3
    }}>
        <Typography variant='h6' mt={1.5} pr={3} pl={3}>¿Tienes algún producto para agregar u otro precio de alguno ya publicado?</Typography>
        <Link href="/form" sx={{ textDecoration: 'none' }}>
            <CustomButton text={'Agregar producto'}/>
        </Link>
    </Box>
  )
}

export default Suggestion