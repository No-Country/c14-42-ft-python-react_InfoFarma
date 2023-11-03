import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, Button, IconButton, Typography, Backdrop, DialogActions } from '@mui/material'
import { IoCloseSharp } from 'react-icons/io5'

export const AvisoResp = ({ open, handleClose }) => {

  return (
    <div>
      <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, color: '#fff' }} />
      <Dialog open={open} onClose={handleClose} sx={{ background: '#356a1952' }} >
        <DialogTitle sx={{ background: '#d0fab9' }}>Aviso de Resposabilidad</DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}>
          <IoCloseSharp />
        </IconButton>
        <DialogContent dividers sx={{ background: '#fff' }}>
          <Typography gutterBottom align='justify' m={'auto'}>
            Este sitio web es puramente informativo y educativo. La información del sitio está sujeta a cambios sin previo aviso.
          </Typography>
          <Typography gutterBottom align='justify' m={'auto'}>
            La información aquí contenida no sustituye el consejo profesional de un médico u otro especialista de la salud.
            Ni el sitio ni sus colaboradores asumen responsabilidad por daños directos o indirectos derivados del uso de esta información.
          </Typography>
          <Typography gutterBottom align='justify' m={'auto'}>
            Al utilizar este sitio, aceptas estos términos y asumes la responsabilidad de su uso. Si no estás de acuerdo con estos términos, por favor, no utilices el sitio.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: '#fff' }}>
          <Button sx={{border: 1, borderRadius: 4, bgcolor: '#d0fab9', color: '#000'}}  variant='container' size='medium' aria-label="aceptar" autoFocus onClick={handleClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


