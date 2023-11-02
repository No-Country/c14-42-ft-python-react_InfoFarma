import React from 'react';
import SideMenu from './components/SideMenu/SideMenu';
import Body from './components/Body/Body';
import Container from './components/Container';
import 'tailwindcss/tailwind.css'; 
import { ViteProvider } from "vite-react";

const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [avisoOpen, setAvisoOpen] = useState(true);

  const [medicamentos, setMedicamentos] = useState([]);
  const [busquedas, setBusquedas] = useState([]);

  const onMedicamentosChange = (medicamentos) => {
    setMedicamentos(medicamentos);
  };

  const onBusquedasChange = (busquedas) => {
    setBusquedas(busquedas);
  };


function DashboardComponent() {
  return (
    <div className="dashboard">
      <SideMenu />
      <Container>
        <Body />
      </Container>
      <ViteProvider>
        <DashboardComponent
          medicamentos={medicamentos}
          onMedicamentosChange={onMedicamentosChange}
          busquedas={busquedas}
          onBusquedasChange={onBusquedasChange}
        />
      </ViteProvider>
    </div>
  );
}

export default DashboardComponent

