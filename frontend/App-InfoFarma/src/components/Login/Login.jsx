import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="card-container">
      <div className="card">
        <button className="login-button" onClick={() => loginWithRedirect()}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default LoginButton;