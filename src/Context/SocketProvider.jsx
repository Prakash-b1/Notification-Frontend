// src/Context/SocketProvider.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { SocketContext } from './SocketContext'; // Import SocketContext

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000', {
      transports: ['polling'], // Use WebSocket for transport
    });

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket && userId) {
      socket.emit('register', userId);
    }
  }, [socket, userId]);

  const registerUser = (id) => {
    setUserId(id);
  };

  return (
    <SocketContext.Provider value={{ socket, registerUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
