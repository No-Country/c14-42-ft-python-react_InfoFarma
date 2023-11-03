import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, Box } from '@mui/material';
import { ItemList } from './ItemList';
import { normalizeName } from '../../../hooks/normalizeName';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../../middlewares/redux/actions';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch()
  const allProducts = useSelector(state => state.allProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch])

  useEffect(() => {
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      setSearchTerm(lastSearchTerm);
      filterData(lastSearchTerm);
    }
  }, [allProducts]);

  const clearInput = () => {
    setSearchTerm('');
    setFilteredData([]);
    localStorage.removeItem('lastSearchTerm');
  }

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    localStorage.setItem('lastSearchTerm', newSearchTerm);
    setSearchTerm(newSearchTerm);
    filterData(newSearchTerm);

  };

  const filterData = (searchTerm) => {
    const normalizedSearchTerm = normalizeName(searchTerm.toLowerCase());
    const filteredData = allProducts.filter((item) =>
      normalizeName(item.name).toLowerCase().includes(normalizedSearchTerm)
    );
    setFilteredData(filteredData);
  };

  const inputProps = {
    style: {
      borderRadius: '20px',
    },
    endAdornment: (
      <IconButton onClick={clearInput}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Box
      className='search-container'
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <TextField
        label="Ingresa tu búsqueda"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={inputProps}
        InputLabelProps={{
          style: {
            color: '#000',
            fontSize: '1.1rem',
          },
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
          minWidth: '300px',
          maxWidth: '600px',
        }}

      />
      {searchTerm && <ItemList filteredData={filteredData} />}
    </Box>
  );
}

export { SearchBar };