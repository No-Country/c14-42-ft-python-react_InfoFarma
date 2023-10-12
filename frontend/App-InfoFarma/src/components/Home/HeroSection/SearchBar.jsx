import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };
 
  const inputProps = {
    style: {
      borderRadius: '20px',
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <TextField
        label="Ingresa tu búsqueda"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
}


export {SearchBar};