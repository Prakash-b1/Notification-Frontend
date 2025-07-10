const NotificationItem = ({ notification }) => {


  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
      {/* Message */}
      <p className="text-lg font-semibold text-gray-800">{notification.message}</p>

      {/* Priority Badge */}
      <span
        className={`inline-block py-1 px-3 text-sm font-medium text-white rounded-full mt-2 ${notification.priority === 'high'
          ? 'bg-red-600'
          : 'bg-gray-400'
          }`}
      >
        {notification.priority}
      </span>
    </div>
  );
};

export default NotificationItem;
