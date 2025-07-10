// App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';            // ← import
import Home from './pages/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SocketProvider from './Context/SocketProvider';
import './App.css';

const App = () => {
  return (
    <>
      {/* Global Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          success: { duration: 3000 },
          error:   { duration: 5000 },
        }}
      />

      <Router>
        <Routes>
          <Route path="/login"  element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/"       element={
            <SocketProvider>
              <Home />
            </SocketProvider>
          }/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
