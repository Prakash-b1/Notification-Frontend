import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/apiConfig';

const fetchUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await axiosInstance.get('/auth/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    retry: false, 
    onError: (error) => {
      console.error('Error fetching user data:', error.message);
    },
  });
};



// Sign up a new user
export const signupUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        throw error;  // Handle errors
    }
};

// Log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data; // Returns { token, user }
    } catch (error) {
        throw error;  // Handle errors appropriately
    }
};
