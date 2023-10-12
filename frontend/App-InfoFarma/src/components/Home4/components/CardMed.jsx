import { Box, Button } from '@mui/material'
import './CardMed.css'

export const CardMed = ({ product }) => {
    if (!product) {
        // Manejo de caso en el que product es undefined
        return <div>No hay datos de productos</div>;
    }
    
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
