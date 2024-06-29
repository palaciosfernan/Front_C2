// Monitor.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // Asegúrate de que la URL sea correcta

export const Monitor = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    socket.on('new_event', (event) => {
      setEvents(prevEvents => [event, ...prevEvents]);
    });

    return () => {
      socket.off('new_event');
    };
  }, []);

  return (
    <div className="monitor-container">
      <h4>Eventos Recientes</h4>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.event_type}</li>
        ))}
      </ul>
    </div>
  );
};
