/* eslint-disable react-refresh/only-export-components */
// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';
import { BaseUrl } from '../utils/BaseUrl';

const SocketContext = createContext(null);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token  = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // string like "686f5da…9331"

    // log BaseUrl too, just to be sure
    console.log('Connecting socket to', BaseUrl);
    const s = io('https://notification-backend-maob.onrender.com', {
      transports: ['websocket','polling'],
      auth: token ? { token } : undefined,
    });

    s.on('connect', () => {
      console.log('✅ Socket connected:', s.id);
      console.log('Attempting to register userId:', userId);
      if (userId) {
        s.emit('registerUser', userId);
        console.log('🟢 registerUser emitted');
      } else {
        console.warn('⚠️ No userId in localStorage');
      }
    });

    s.on('notification', newNotification => {
      console.log('✨ New notification in provider:', newNotification);
      queryClient.setQueryData(['notifications'], old => [ newNotification, ...(old||[]) ]);
    });

    setSocket(s);
    return () => {
      s.off('notification');
      s.disconnect();
    };
  }, [queryClient]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}
