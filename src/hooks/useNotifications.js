import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, createNotification } from '../services/notifications';
import toast from 'react-hot-toast';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'], 
    queryFn: fetchNotifications,  
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();  // Access queryClient to manage caching and refetching

  return useMutation({
    mutationFn: createNotification,  
    onSuccess: (data) => {
      toast.success('Notification created successfully!');  // Show success toast notification
      queryClient.invalidateQueries(['notifications']);  // This triggers a refetch of the 'notifications' query
    },
    onError: (error) => {
      console.error('Error creating notification:', error);
    },
  });
};