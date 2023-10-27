import { Box, Tabs, Tab } from '@mui/material'

export const Navegador = ({ letras, letraSeleccionada, onChange }) => {

    return (
        <Box 
        sx={{ 
            maxWidth: {xs: '97%', md:'77%'},
            margin: {xs: 1}
            }}>
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
