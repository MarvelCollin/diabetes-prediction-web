import React from 'react';
import { useApiStatus } from '../../hooks/useApiStatus';

const ApiStatus: React.FC = () => {
  const { isConnected, isLoading } = useApiStatus();

  if (isLoading) {
    return (
      <div className="text-xs rounded-md px-2 py-1 bg-gray-100 text-gray-700">
        Checking API...
      </div>
    );
  }

  if (isConnected === true) {
    return (
      <div className="text-xs rounded-md px-2 py-1 bg-green-100 text-green-700 flex items-center">
        <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
        API Connected
      </div>
    );
  }

  return (
    <div className="text-xs rounded-md px-2 py-1 bg-red-100 text-red-700 flex items-center">
      <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
      API Disconnected
    </div>
  );
};

export default ApiStatus; 