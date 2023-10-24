import ReactCardFlip from 'react-card-flip';
import { Paper, Stack, Typography } from "@mui/material";
import { CustomButton } from "./CustomButton";
import './Item.css';
import { useState } from 'react';

export const Item = ({product}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Paper
        onClick={handleFlip}
        className="container"
        item
        xs={12}
        sm={6}
        md={4}
        lg={3} 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center',
          // alignContent: 'center',
          boxShadow: 1,
          borderRadius: 5,
          padding: 2,
          bgcolor: '#fff',
          m: 2.5,
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '180px'
        }}
      >
        <img
          src={product.imagen}
          alt={product.medicamento}
          className="item--img"
        />
        <Stack sx={{  flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {product.medicamento}
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

      <Paper
        onClick={handleFlip}
        className="container"
        item
        xs={12}
        sm={6}
        md={4}
        lg={3} 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          boxShadow: 1,
          borderRadius: 5,
          padding: 2,
          bgcolor: '#fff',
          m: 2.5,
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '180px',
          maxHeight: '180px'
        }}
      >
        <Stack sx={{ margin: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">
            {product.medicamento}
          </Typography>
          <Typography variant="subtitle1" sx={{ wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', maxWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {product.presentacion}
          </Typography>
          <Typography variant="subtitle1" >
            Precio Mínimo: ${product.min_price}
          </Typography>
          <Typography variant="subtitle1">
            Precio Máximo: ${product.max_price}
          </Typography>
          <Typography variant="subtitle1" >
            Porcentaje: {product.porcentaje}%
          </Typography>
        </Stack>
      </Paper>
    </ReactCardFlip>
  )
}
