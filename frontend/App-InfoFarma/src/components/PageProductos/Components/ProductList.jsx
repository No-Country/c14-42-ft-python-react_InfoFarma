import { Grid } from '@mui/material';
import { Item } from '../../Home/HeroSection/Item';

export const ProductList = ({ productos, letraSeleccionada }) => {
    const productosFiltrados = productos.filter((producto) =>
        letraSeleccionada ? producto.name.startsWith(letraSeleccionada) : true
    );

    return (
        <Grid container spacing={3} sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: '1',
            marginTop: '2rem',
            marginBottom: '2rem',
            padding: '0 1rem 0 2.5rem'
        }}
        >
            {productosFiltrados.map((producto) => (
                <Item key={producto.id} product={producto} />
            ))}
        </Grid>
    );
};
