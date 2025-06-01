import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PredictionResult } from '../../types';

// Risk level interpretation based on probability
const getRiskInterpretation = (probability: number): string => {
  if (probability >= 0.7) {
    return 'Your results indicate a high risk of diabetes. It is strongly recommended to consult with a healthcare professional for further assessment and advice.';
  } else if (probability >= 0.4) {
    return 'Your results indicate a moderate risk of diabetes. Consider discussing these results with your doctor during your next visit.';
  } else {
    return 'Your results indicate a lower risk of diabetes. However, maintaining a healthy lifestyle is still important for preventing future health issues.';
  }
};

// Recommendations based on risk level
const getRecommendations = (probability: number): string[] => {
  const commonRecommendations = [
    'Maintain a balanced diet rich in fruits, vegetables, and whole grains',
    'Exercise regularly (aim for at least 150 minutes of moderate activity per week)',
    'Maintain a healthy weight',
    'Get regular health check-ups'
  ];
  
  if (probability >= 0.7) {
    return [
      'Schedule an appointment with your healthcare provider as soon as possible',
      'Consider getting a comprehensive metabolic panel blood test',
      'Monitor your blood sugar levels regularly',
      ...commonRecommendations
    ];
  } else if (probability >= 0.4) {
    return [
      'Discuss diabetes screening with your healthcare provider',
      'Be mindful of carbohydrate intake',
      'Consider reducing intake of processed sugars',
      ...commonRecommendations
    ];
  } else {
    return [
      'Continue maintaining your current healthy habits',
      'Stay informed about diabetes risk factors',
      ...commonRecommendations
    ];
  }
};

const Results: React.FC = () => {
  const location = useLocation();
  const result = location.state as PredictionResult;
  
  if (!result) {
    return <Navigate to="/form" />;
  }

  const { prediction, probability } = result;
  const probabilityPercentage = Math.round(probability * 100);
  const interpretation = getRiskInterpretation(probability);
  const recommendations = getRecommendations(probability);

  return (
    <motion.div 
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className={`px-6 py-4 ${prediction ? 'bg-red-600' : 'bg-green-600'}`}>
          <h2 className="text-2xl font-bold text-white">Your Results</h2>
          <p className="text-white opacity-90">Based on the parameters you provided</p>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className={`text-2xl font-bold mb-3 ${prediction ? 'text-red-600' : 'text-green-600'}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {prediction ? 'Higher Risk Detected' : 'Lower Risk Detected'}
            </motion.div>
            
            <motion.div 
              className="w-full bg-gray-200 rounded-full h-4 mb-4"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div 
                className={`h-4 rounded-full ${
                  probability >= 0.7 ? 'bg-red-500' : 
                  probability >= 0.4 ? 'bg-orange-500' : 
                  'bg-green-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${probabilityPercentage}%` }}
                transition={{ delay: 0.8, duration: 1.2 }}
              ></motion.div>
            </motion.div>
            
            <p className="text-gray-700">
              Risk Score: <span className="font-semibold">{probabilityPercentage}%</span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">What does this mean?</h3>
            <p className="text-gray-600 mb-3">
              {interpretation}
            </p>
            <p className="text-gray-600">
              Remember, this tool is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Recommendations</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                to="/form"
                className="block w-full py-3 bg-gray-200 hover:bg-gray-300 text-center text-gray-800 font-medium rounded-lg transition-colors"
              >
                Try Again
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                to="/"
                className="block w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-center text-white font-medium rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Results;