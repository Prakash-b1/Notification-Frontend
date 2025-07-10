import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotifications, createNotification } from '../services/notifications';

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
      console.log('Notification created successfully:', data);
      
      // Refetch the 'notifications' query after the notification is created
      queryClient.invalidateQueries(['notifications']);  // This triggers a refetch of the 'notifications' query
    },
    onError: (error) => {
      console.error('Error creating notification:', error);
    },
  });
};