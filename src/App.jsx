import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import './App.css'
import SignUp from './components/SignUp';
import SocketProvider from './Context/SocketProvider';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/" element={ <SocketProvider> <Home /></SocketProvider>} />
      </Routes>
    </Router>
  );
};

export default App;
