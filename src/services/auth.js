import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../utils/apiConfig';
import toast from 'react-hot-toast';

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



export const signupUser = (userData) =>
  axiosInstance.post('/auth/signup', userData).then(res =>{
    toast.success('Signup successful! Please log in.')
    return res.data;
  })

export const loginUser = (credentials) => {
  return axiosInstance
    .post('/auth/login', credentials)
    .then(res => {
      toast.success(`Login successful!`);
      return res.data;
    });
};

export const useSignupUser = () => {
  return useMutation(signupUser, {
    onSuccess: () => {
      toast.success('Signup successful! Please log in.')
    },
    onError: (err) => {
      console.error('Signup failed:', err.message)
      toast.error(`Signup failed: ${err.response?.data?.message || err.message}`)
    },
  })
}


export const useLoginUser = () => {
  const queryClient = useQueryClient()

  return useMutation(loginUser, {
    onSuccess: ({ token, user }) => {
      console.log('Login successful:', user)
      localStorage.setItem('token', token)
      queryClient.setQueryData(['user'], user)
      toast.success(`Welcome back, ${user.name}!`)
    },
    onError: (err) => {
      console.error('Login failed:', err.message)
      toast.error(`Login failed: ${err.response?.data?.message || err.message}`)
    },
  })
}