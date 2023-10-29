import * as React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#FFF',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  height: '60px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#232D21',
});

const StyledButton = styled(Button)({
  color: 'white',
  display: 'block',
});

const StyledMenuIcon = styled(MenuIcon)({
  color: '#366A19',
  fontSize: '30px',
  marginTop: '-5px',
});

const StyledLogo = styled('img')({
  height: '100%', // Establece la altura de la imagen al 100% del Navbar
  display: 'block',
  marginBottom: '12px',
});

const pages = ['Login', 'Home', 'Productos', 'Padecimientos', 'Nosotros', 'Dashboard'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <StyledAppBar sx={{ backgroundColor: '#FFF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', height: '20px' }}>
          <StyledLogo alt="logo de la empresa." src='/favicon.png' />
          
          <Typography variant="h6" sx={{ color: '#232D21' }}>
            <StyledLink to='/'>
              InfoFarma
            </StyledLink>
          </Typography>

          <Box sx={{ display: 'none', md: 'flex' }}>
            {pages.map((page) => (
              <StyledButton key={page}>
                <StyledLink to={`/${page}`}>
                  {page}
                </StyledLink>
              </StyledButton>
            ))}
          </Box>

          <Box sx={{ display: 'flex', md: 'none' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <StyledMenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: 'block',
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <StyledLink to={`/${page}`}>
                      {page}
                    </StyledLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default NavBar;
