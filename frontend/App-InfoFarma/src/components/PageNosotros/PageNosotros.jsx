import { Button } from '@mui/material'
import { useState } from 'react'
import { AvisoResp } from '../AvisoResp'

export const PageNosotros = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>PageNosotros
      <div><Button onClick={handleOpenDialog}>Aviso</Button></div>
      <AvisoResp open={dialogOpen} handleClose={handleCloseDialog} />
    </div>
  )
}
