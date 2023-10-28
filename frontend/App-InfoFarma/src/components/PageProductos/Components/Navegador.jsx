import { Box, Tabs, Tab } from '@mui/material';

export const Navegador = ({ letras, letraSeleccionada, onChange, }) => {
  const isMobile = window.innerWidth <= 775;

  return (
    <Box
      sx={{
        maxWidth: '70%',
        marginBottom: isMobile ? '1rem' : 0, // Agregar margen inferior en dispositivos móviles
      }}
    >
      <Tabs
        value={letraSeleccionada}
        onChange={(event, newValue) => onChange(newValue)}
        variant='scrollable'
        scrollButtons='auto'
      >
        {letras.map((letra) => (
          <Tab key={letra} label={letra} value={letra} />
        ))}
      </Tabs>
    </Box>
  );
};
