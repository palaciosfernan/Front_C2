import React, { useState } from 'react';
import '../components/atomic/input.css';
import InputMain from '../components/atomic/InputnMain';
import Panel from '../Controller/Home/ControllerPanel';

export function AltLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          const decodedToken = JSON.parse(atob(data.token.split('.')[1])); 
          setRole(decodedToken.role);
          localStorage.setItem('token', data.token); 
          setIsLoggedIn(true);
        } else {
          alert('Las credenciales ingresadas son incorrectas. Por favor, verifique sus datos e inténtelo de nuevo.');
        }
      } else {
        alert('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la solicitud. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remover el token del localStorage al cerrar sesión
    setIsLoggedIn(false);
  };

  return (
    <> 
      <div className='div-main-container'>
        <div className='top-image-container'>
          <img className='logo-container' src="logo.png" alt="Logo" />
        </div>
        <div className='middle-image-container'>
          <img src="hose.jpg" alt="Second Image" />
        </div>
        {!isLoggedIn ? (
          <form onSubmit={handleLogin}>
            <InputMain label="Username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <InputMain label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className='mainButton'>SIGN IN</button>
          </form>
        ) : (
          <Panel onLogout={handleLogout} userRole={role} /> // Pasar el rol al componente Panel
        )}
      </div>
    </>
  );
}
