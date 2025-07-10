import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { BaseUrl } from '../utils/BaseUrl';

let socket;

export const useSocket = () => {
  useEffect(() => {
    // Initialize socket connection if not already initialized
    if (!socket) {
      socket = io(BaseUrl);
      socket.connect();
      console.log("Socket connected");
    }

    socket.on('connected', (data) => {
      console.log(data.message); // Should log 'You are connected!' if the connection is successful
    });


    // Retrieve the user ID from localStorage
    const userId = localStorage.getItem('userId');
    console.log("User ID from localStorage:", userId);

    if (userId) {
      console.log("Registering user with ID:", userId);
      // Emit the register event with the userId to associate the socket with the user
      socket.emit('register', userId);
    } else {
      console.error("User ID not found in localStorage");
    }

    // Listen for notifications
    socket.on('notification', (notification) => {
      console.log('New notification received:', notification);
    });

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      console.log("Cleanup: Disconnecting socket");
      socket.off('notification');
      socket.off('connected');  // Cleanup listener

    };
  }, []);
  return socket;
};
