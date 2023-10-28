import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { PageNosotros } from './components/PageNosotros/PageNosotros'
import { PageProductos } from './components/PageProductos/PageProductos'
import { AvisoResp } from './components/AvisoResp'
import { useState } from 'react'


function App() {
  const [avisoOpen, setAvisoOpen] = useState(true);
  return (
    <>
      <BrowserRouter>
        {avisoOpen && <AvisoResp open={avisoOpen} handleClose={() => setAvisoOpen(false)} />}
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/productos' element={<PageProductos />} />
          <Route path='/nosotros' element={<PageNosotros />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App;
