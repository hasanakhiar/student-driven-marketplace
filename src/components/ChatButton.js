import React from 'react';
import { FaComments } from 'react-icons/fa';

const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <FaComments className="w-5 h-5 mr-2" />
      Live Chat
    </button>
  );
};

export default ChatButton; 