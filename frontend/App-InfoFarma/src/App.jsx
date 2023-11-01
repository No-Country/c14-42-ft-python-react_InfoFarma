import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { AvisoResp } from './components/AvisoResp/AvisoResp';
import PrivateRoute from './router/PrivateRoute';
import DashboardComponent from './components/Dashboard/components/DashboardComponent';
import LoginButton from './components/Login/Login';
import LogoutButton from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import PageNosotros from './components/PageNosotros/PageNosotros';
import PageProductos from './components/PageProductos/PageProductos';
import PageNewProduct from "./components/PageNewProd/PageNewProd"

function App() {
  const { isAuthenticated } = useAuth0();
  const [avisoOpen, setAvisoOpen] = useState(true);

  return (
    <>
      <div className='flex items-center justify-center'>
        <Router>
          {avisoOpen && <AvisoResp open={avisoOpen} handleClose={() => setAvisoOpen(false)} />}
          <NavBar />
          <div className='App'>
            {/* <header className='App-header'>
              {isAuthenticated ? (
                <>
                  <Profile />
                  <LogoutButton />
                </>
              ) : (
                <LoginButton />
              )}
            </header> */}
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<PageNewProduct />} />
            <Route path='/login' element={<LoginButton />} />
            <Route path='/logout' element={<LogoutButton />} />
            <Route path='/profile' element={<Profile />} />
            {isAuthenticated && <Route path='/dashboard' element={<DashboardComponent />} />}
            <Route path='/home' element={<Home />} />
            <Route path='/productos' element={<PageProductos />} />
            <Route path='/nosotros' element={<PageNosotros />} />
          </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;