import { useState, useEffect } from 'react';
import { apiService } from '../utils/api';

export const useApiStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkApiStatus = async () => {
      setIsLoading(true);
      try {
        const connected = await apiService.checkHealth();
        setIsConnected(connected);
      } catch (error) {
        console.error('API connection error:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkApiStatus();

    const interval = setInterval(checkApiStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return { isConnected, isLoading };
}; 