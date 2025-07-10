import axiosInstance from '../utils/apiConfig';

// Fetch all notifications
export const fetchNotifications = async () => {
  try {
    const response = await axiosInstance.get('/notifications');
    return response.data;
  } catch (error) {
    throw error;  // Handle errors
  }
};

// Create a new notification
export const createNotification = async (notificationData) => {
  try {
    const response = await axiosInstance.post('/notifications', notificationData);
    return response.data;
  } catch (error) {
    throw error;  // Handle errors
  }
};
