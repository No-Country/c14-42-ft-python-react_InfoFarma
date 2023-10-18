import { useState } from "react";
import { Grid, Box, Typography, Pagination } from "@mui/material";
import { Item } from "./Item";

export const ItemList = ({searchTerm, filteredData}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {
        filteredData.length > 0 ?
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center' 
            }}>
            <Grid
              container
              sx={{
                gap: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
              {currentItems.map((product, index) => (
                <Item key={product.id} product={product}/>
              ))}
            </Grid>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChange}
            />
          </Box> :
          <Typography variant="h5">No hay coincidencias con su búsqueda.</Typography>
      }
    </>
  )
}
