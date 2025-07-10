// src/Context/SocketContext.jsx
import { createContext, useContext } from 'react';

// Create a Context for the Socket
export const SocketContext = createContext();

// Custom hook to access the SocketContext
export const useSocket = () => useContext(SocketContext);
