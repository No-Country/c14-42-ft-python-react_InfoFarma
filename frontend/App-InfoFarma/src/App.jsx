import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { PageNosotros } from './components/PageNosotros/PageNosotros'
import { Home4 } from './components/Home4/Home4'
import IconsInfo from './components/Home/Icons&Info'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/nosotros' element={<PageNosotros/>}/>
          <Route path='/a' element={<IconsInfo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
