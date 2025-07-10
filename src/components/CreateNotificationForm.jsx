import {  useRef } from 'react';
import { useCreateNotification } from '../hooks/useNotifications';
import { useEffect } from 'react';
import { useGetUser } from '../services/auth';

const CreateNotificationForm = () => {
    const { data: me,  } = useGetUser();

  const { mutate, isSuccess } = useCreateNotification();
  const formRef = useRef(); // Create a reference for the form

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const priority = e.target.priority.value;
    const recipientId = e.target.recipientId.value;

    // Call mutate to create the notification
    mutate({ message, priority, recipientId });
  };

  useEffect(() => {
    if (isSuccess) formRef.current.reset();
  }, [isSuccess]);


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-6"
      ref={formRef} // Attach the ref to the form element
    >
      <h2 className="text-xl font-semibold text-gray-700">Create New Notification</h2>

      <input type="hidden" name="recipientId" value={me.id} />

      {/* Message Input */}
      <div>
        <input
          type="text"
          name="message"
          placeholder="Enter notification message"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      {/* Priority Selector */}
      <div>
        <select
          name="priority"
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        >
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          Create Notification
        </button>
      </div>
    </form>
  );
};

export default CreateNotificationForm;
