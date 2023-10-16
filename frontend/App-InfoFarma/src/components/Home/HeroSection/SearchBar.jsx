import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box } from '@mui/material';
import { CardMed } from '../../Home4/components/CardMed';

function SearchBar() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(products);

  useEffect(() => {
    const asyncFunction = async () => {
      const response = await fetch('/data/precios_medicamentos.json')
      const jsonData = await response.json()
      setProducts(jsonData.data)
    }
      asyncFunction();
  }, [])

  const clearInput = () => {
    setSearchTerm('');
  }
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (searchTerm) => {
    const filteredData = products.filter((item) =>
      item.medicamento.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredData);
    console.log(filteredData);
  };


  const inputProps = {
    style: {
      borderRadius: '20px',
    },
    endAdornment: (
      <IconButton onClick={clearInput}>
        <ClearIcon/> 
      </IconButton>
    )
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <TextField
        label="Ingresa tu búsqueda"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={inputProps}
        InputLabelProps={{
          style: { color: '#000' },
        }}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "#366a19"
            }
          },
           "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#3f7b1d"
            }
          },
        }}
        
      />
      <ul>
        {searchTerm && filteredData.map((product) => (
          <CardMed key={product.id} product={product} />
          // <li key={product.id}>{item.medicamento}</li>
        ))}
      </ul>
    </Box>
  );
}


export {SearchBar};