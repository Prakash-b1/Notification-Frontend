// src/hooks/useNotifications.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast  from 'react-hot-toast';
import { fetchNotifications, createNotification } from '../services/notifications';

export const useNotifications = () => {
  return useQuery(
    ['notifications'],
    fetchNotifications,
    {
      // show an error toast if fetching fails
      onError: () => {
        toast.error('Failed to load notifications');
      }
    }
  );
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    createNotification,
    {
      onSuccess: () => {
        toast.success('Notification created!');
        // refresh list
        queryClient.invalidateQueries(['notifications']);
      },
      onError: (err) => {
        // try to pull a useful server message, or fallback
        const msg = err.response?.data?.message || 'Could not create notification';
        toast.error(msg);
      }
    }
  );
};
