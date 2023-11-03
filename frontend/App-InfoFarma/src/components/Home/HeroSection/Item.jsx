import ReactCardFlip from 'react-card-flip';
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { CustomButton } from "./CustomButton";
import './Item.css';
import { useState } from 'react';

export const Item = ({product}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const firstLetter = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const restOfStr = str.slice(1);
    return firstLetter.concat(restOfStr);
}

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Grid
        onClick={handleFlip}
        item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          boxShadow: 1,
          borderRadius: 5,
          padding: 2,
          bgcolor: '#fff',
          m: 2.5,
          ml: {xs: .5, sm: 1.2},
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '180px'
        }}
      >
        <img
          src={product.img}
          alt={product.name}
          className="item--img"
        />
        <Stack sx={{  flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {firstLetter(product.name)}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Precio: ${product.price}
          </Typography>
          <CustomButton aria-label={"detalles"} text={'Ver Detalles'} />
        </Stack>
      </Grid>

      <Grid
        onClick={handleFlip}
        item
        sx={{
          display: 'flex',
          flexDirection: 'row',
          boxShadow: 1,
          borderRadius: 5,
          padding: 2,
          bgcolor: '#fff',
          m: 2.5,
          ml: {xs: .5, sm: 1.2},
          minWidth: '300px',
          maxWidth: '300px',
          minHeight: '180px'
        }}
      >
        <Stack sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">
            {firstLetter(product.name)}
          </Typography>
          <Typography variant="subtitle1" sx={{  margin: 0, maxWidth: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {product.details}
          </Typography>
          <Typography variant="subtitle1">
            Disponible en: {firstLetter(product.pharmacy_name)}
          </Typography>
        </Stack>
      </Grid>
    </ReactCardFlip>
  )
}
