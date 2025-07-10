import NotificationItem from './NotificationItem';
import { useNotifications } from '../hooks/useNotifications';

const NotificationList = () => {
  const { data: notifications, isLoading, isError } = useNotifications();



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
