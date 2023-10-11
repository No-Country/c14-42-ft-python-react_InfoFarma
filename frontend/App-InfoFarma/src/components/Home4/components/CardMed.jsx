import { Box, Button } from '@mui/material'
import './CardMed.css'

export const CardMed = ({ product }) => {
    const { medicamento, imagen } = product

    return (
        <Box className='box-card'>
            <img className='img-card'
                src={imagen} alt={medicamento} />
            <h3> {medicamento} </h3>
            <Button
                variant='contained' className='custom-btn-card'>
                Ver precio
            </Button>
        </Box>
    )
}
