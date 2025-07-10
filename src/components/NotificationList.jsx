import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';
import { useSocket } from '../Context/SocketProvider';

const NotificationList = () => {
  // 1) Use your existing hook
  const { data: initialNotifications, isLoading, isError } = useNotifications();
  const socket = useSocket();

  // 2) Local state to manage the list
  const [notifications, setNotifications] = useState([]);

  // 3) When your hook’s data arrives, seed the local state
  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  // 4) Listen for real-time updates and prepend them
  useEffect(() => {
    if (!socket) return;
    const handler = (notif) => {
      alert(`New notification:\n${notif.message}`);
      setNotifications(prev => [notif, ...prev]);
    };
    socket.on('notification', handler);
    return () => socket.off('notification', handler);
  }, [socket]);

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
        notifications?.map(notification => (
          <NotificationItem key={notification._id} notification={notification} />
        ))
      ) : (
        <p className="text-center text-gray-500">No notifications available</p>
      )}
    </div>
  );
};

export default NotificationList;
