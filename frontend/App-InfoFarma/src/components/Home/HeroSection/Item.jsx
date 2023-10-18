import { Grid, Stack, Typography } from "@mui/material";
import { CustomButton } from "./CustomButton";
import './Item.css';

export const Item = ({product}) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3} 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', lg: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 1,
        borderRadius: 5,
        padding: 2,
        bgcolor: '#40c0cb',
        m: 1,
        minWidth: '300px',
      }}
    >
      <img
        src={product.imagen}
        alt={product.medicamento}
        className="item--img"
      />
      <Stack sx={{ margin: 1, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.medicamento}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Precio Mínimo: ${product.precio_minimo}
        </Typography>
        <Typography variant="subtitle1">
          Precio Máximo: ${product.precio_maximo}
        </Typography>
        <CustomButton text={'Ver Detalles'} />
      </Stack>
    </Grid>
  )
}
