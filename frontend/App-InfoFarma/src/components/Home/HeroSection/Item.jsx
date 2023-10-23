import { Paper, Stack, Typography } from "@mui/material";
import { CustomButton } from "./CustomButton";
import './Item.css';

export const Item = ({product}) => {
  return (
    <Paper
      className="container"
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
        bgcolor: '#fff',
        m: 2.5,
        minWidth: '300px',
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        className="item--img"
      />
      <Stack sx={{ margin: 1, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Precio Mínimo: ${product.min_price}
        </Typography>
        <Typography variant="subtitle1">
          Precio Máximo: ${product.max_price}
        </Typography>
        <CustomButton text={'Ver Detalles'} />
      </Stack>
    </Paper>
  )
}
