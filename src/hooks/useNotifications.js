import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, createNotification } from '../services/notifications';
import toast from 'react-hot-toast';

// Fetch notifications using useQuery
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],  // Unique key for caching notifications
    queryFn: fetchNotifications,  // Fetch function to call
  });
};

// Create a new notification using useMutation
export const useCreateNotification = () => {
  const queryClient = useQueryClient();  // Access queryClient to manage caching and refetching

  return useMutation({
    mutationFn: createNotification,  // Mutation function to create a notification
    onSuccess: (data) => {
      // console.log('Notification created successfully:', data);
      toast.success('Notification created successfully!');  // Show success toast notification
      
      // Refetch the 'notifications' query after the notification is created
      queryClient.invalidateQueries(['notifications']);  // This triggers a refetch of the 'notifications' query
    },
    onError: (error) => {
      console.error('Error creating notification:', error);
    },
  });
};