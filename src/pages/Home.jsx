import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNotificationForm from '../components/CreateNotificationForm';
import NotificationList from '../components/NotificationList';
import { useGetUser } from '../services/auth';
import { useSocket } from '../Context/SocketContext';

const Home = () => {
  const { data, isLoading, isError } = useGetUser();  // Fetch logged-in user data
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { socket, registerUser } = useSocket();
  
  useEffect(() => {
    if (data?.id) {
      registerUser(data.id);
    }
  }, [data, registerUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        <span className="ml-4 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  if (isError || !isAuthenticated) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error fetching user data or you are not authenticated</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-indigo-600 p-4 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-extrabold text-white">Real-time Notifications</h1>
        <button
          onClick={() => navigate('/login')}
          className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md transition duration-200"
        >
          Logout
        </button>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Only allow managers to create notifications */}
        {data?.role === 'manager' && (
          <div className="mb-6">
            <CreateNotificationForm />
          </div>
        )}
        {/* Notification List */}
        <div>
          <NotificationList />
        </div>
      </div>
    </div>
  );
};

export default Home;
