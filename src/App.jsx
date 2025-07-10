// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient
import Home from './pages/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import { SocketProvider } from './Context/SocketProvider';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />

      {/* Provide the client to your App */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={
              // SocketProvider now has access to the query client
              <SocketProvider>
                <Home />
              </SocketProvider>
            } />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
};

export default App;