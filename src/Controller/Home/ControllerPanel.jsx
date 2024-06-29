import React, { useState } from 'react';
import axios from 'axios';
import '../Home/main.css';
import { Monitor } from '../Status/MonitorPanel';
import MainHouse from '../../Pages/HouseMain';

const Panel = ({ onLogout, userRole }) => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [acOn, setAcOn] = useState(false);

  const recordEvent = async (eventMessage) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      await axios.post('http://localhost:3000/api/events', {
        event_type: eventMessage,
        created_at: new Date(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(`Evento registrado: ${eventMessage}`);
    } catch (error) {
      console.error('Error registrando evento:', error);
    }
  };

  const handleLightActivation = (isOn) => {
    if (['Padre', 'Hijo'].includes(userRole)) {
      try {
        setLightOn(isOn);
        const eventMessage = isOn ? 'Foco encendido' : 'Foco apagado';
        console.log(eventMessage);
        recordEvent(eventMessage);
      } catch (error) {
        console.error(`Error ${isOn ? 'encendiendo' : 'apagando'} el foco:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleDoorAction = async (action) => {
    if (['Padre', 'Hijo'].includes(userRole)) {
      try {
        setDoorOpen(action === 'Open');
        const eventMessage = action === 'Open' ? 'Puerta abierta' : 'Puerta cerrada';
        console.log(eventMessage);
        recordEvent(eventMessage);
      } catch (error) {
        console.error(`Error ${action === 'Open' ? 'abriendo' : 'cerrando'} la puerta:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleGateAction = async (action) => {
    if (userRole === 'Padre') {
      try {
        setGarageOpen(action === 'Open');
        const eventMessage = action === 'Open' ? 'Portón abierto' : 'Portón cerrado';
        console.log(eventMessage);
        recordEvent(eventMessage);
      } catch (error) {
        console.error(`Error ${action === 'Open' ? 'abriendo' : 'cerrando'} el portón:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleACActivation = async (isOn) => {
    if (['Padre', 'Hijo'].includes(userRole)) {
      try {
        setAcOn(isOn);
        const eventMessage = isOn ? 'Aire acondicionado activado' : 'Aire acondicionado desactivado';
        console.log(eventMessage);
        recordEvent(eventMessage);
      } catch (error) {
        console.error(`Error ${isOn ? 'activando' : 'desactivando'} el aire acondicionado:`, error);
      }
    } else {
      alert('No tiene permisos para realizar esta acción.');
    }
  };

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    } else {
      console.error('onLogout is not a function');
    }
  };

  return (
    <div className='panel-container'>
      <div style={{ textAlign: 'center', marginLeft: '100px' }}>
        <Monitor />
      </div>

      <div className='container-main'>
        <h4>Panel de control</h4>
        <section>
          <p>Foco</p>
          <div className="Focus-container">
            <button onClick={() => handleLightActivation(true)}>Activar</button>
            <button onClick={() => handleLightActivation(false)}>Desactivar</button>
          </div>
          <p>Puerta Principal</p>
          <div className='Focus-container'>
            <button onClick={() => handleDoorAction('Open')}>Abrir Puerta</button>
            <button onClick={() => handleDoorAction('Close')}>Cerrar Puerta</button>
          </div>
          <p>Portón</p>
          <div className='Focus-container'>
            <button onClick={() => handleGateAction('Open')}>Abrir Portón</button>
            <button onClick={() => handleGateAction('Close')}>Cerrar Portón</button>
          </div>
          <p>Aire Acondicionado</p>
          <div className='Focus-container'>
            <button onClick={() => handleACActivation(true)}>Activar</button>
            <button onClick={() => handleACActivation(false)}>Desactivar</button>
          </div>
          <button onClick={handleLogout}>Salir</button>
        </section>
      </div>

      <div className='main-house-container'>
        <MainHouse
          doorOpen={doorOpen}
          garageOpen={garageOpen} // Pasa el estado inicial correctamente
          isLightOn={lightOn}
          acOn={acOn}
        />
      </div>
    </div>
  );
};

export default Panel;