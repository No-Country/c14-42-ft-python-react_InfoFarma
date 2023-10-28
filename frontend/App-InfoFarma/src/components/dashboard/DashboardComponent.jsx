// dashboard/Dashboard.jsx
import React from 'react';
import SideMenu from './SideMenu/SideMenu';
import Body from './Body/Body';
import Container from './Container';

export function DashboardComponent() {
  return (
    <div className="dashboard">
      <SideMenu />
      <Container>
        <Body />
      </Container>
    </div>
  );
}

