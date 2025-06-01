import axios from 'axios';
import { DiabetesFormData } from '../types';

// Get the API URL from environment variables or use default
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9002';

// Configure axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

interface PredictionResponse {
  prediction: boolean;
  probability: number;
  risk_level: string;
}

export const apiService = {
  // Health check endpoint
  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get('/health');
      return response.data.status === 'healthy';
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },

  // Prediction endpoint
  predictDiabetes: async (data: DiabetesFormData): Promise<PredictionResponse> => {
    try {
      console.log('Sending data to API:', JSON.stringify(data));
      
      // Make sure numeric values are actually numbers, not strings
      const processedData = {
        pregnancies: Number(data.pregnancies),
        glucose: Number(data.glucose),
        bloodPressure: Number(data.bloodPressure),
        skinThickness: Number(data.skinThickness),
        insulin: Number(data.insulin),
        bmi: Number(data.bmi),
        diabetesPedigreeFunction: Number(data.diabetesPedigreeFunction),
        age: Number(data.age)
      };
      
      const response = await apiClient.post('/predict', processedData);
      console.log('API response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Prediction failed:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      throw error;
    }
  }
}; 