import React from 'react';
import SideMenu from './components/SideMenu/SideMenu';
import Body from './components/Body/Body';
import Container from './components/Container';

function DashboardComponent() {
  return (
    <div className="dashboard">
      <SideMenu />
      <Container>
        <Body />
      </Container>
    </div>
  );
}

export default DashboardComponent

