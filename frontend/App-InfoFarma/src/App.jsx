import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashboardComponent} from './components/dashboard/DashboardComponent'
import { LoginButton } from './components/Login/Login'
import { LogoutButton } from './components/Logout/Logout'
import { Profile } from './components/Profile/Profile'
import { Home } from './components/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { PageNosotros } from './components/PageNosotros/PageNosotros'
import { PageProductos } from './components/PageProductos/PageProductos'
import { useAuth0 } from '@auth0/auth0-react'


function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
    <div className='flex items-center justify-center'>
      <BrowserRouter>
        <NavBar />
      <div className='App'>
        <header className='App-header'>
          {isAuthenticated ? (
            <>
            <Profile />
            <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </header>
      </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginButton />} />
          <Route path='/logout' element={<LogoutButton />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<DashboardComponent />} />
          <Route path='/home' element={<Home />} />
          <Route path='/productos' element={<PageProductos />} />
          <Route path='/nosotros' element={<PageNosotros />} />
        </Routes>

      </BrowserRouter>
    </div>
    </>
  )
}

export default App;
