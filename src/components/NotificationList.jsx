import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';
import { useSocket } from '../Context/SocketProvider';

const NotificationList = () => {
  const { data: notifications, isLoading, isError } = useNotifications();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handler = (notif) => {
      // 1) Show an alert for each incoming notification
      alert(`New notification:\n${notif.message}`);

      // 2) Update the react-query cache so the UI list re-renders
      queryClient.setQueryData(['notifications'], (old = []) => [
        notif,
        ...old,
      ]);
    };

    socket.on('notification', handler);
    return () => socket.off('notification', handler);
  }, [socket, queryClient]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
        <span className="ml-4 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error fetching notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notifications?.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications available</p>
      )}
    </div>
  );
};

export default NotificationList;
