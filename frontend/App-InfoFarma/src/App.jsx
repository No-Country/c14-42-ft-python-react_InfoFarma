import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { PageNosotros } from './components/PageNosotros/PageNosotros'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/nosotros' element={<PageNosotros/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
