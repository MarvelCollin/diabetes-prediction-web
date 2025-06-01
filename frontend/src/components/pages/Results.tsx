import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ParameterInfo from '../common/ParameterInfo';
import { useChartData } from '../../hooks/useChartData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Results: React.FC = () => {
  const location = useLocation();
  const { generateOverallRiskChart, overallRiskChartOptions } = useChartData();
  
  if (!location.state) {
    return <Navigate to="/form" />;
  }
  
  const state = location.state as any;
  const prediction = Boolean(state.prediction);
  const probability = Number(state.probability || 0);
  const formData = state.formData || {};
  
  const probabilityPercentage = Math.round(probability * 100);
  
  let riskLevel = "Lower";
  let riskColor = "text-green-600";
  let progressColor = "bg-green-500";
  
  if (probability >= 0.7) {
    riskLevel = "High";
    riskColor = "text-red-600";
    progressColor = "bg-red-500";
  } else if (probability >= 0.4) {
    riskLevel = "Moderate";
    riskColor = "text-orange-500";
    progressColor = "bg-orange-500";
  }

  const overallRiskChartData = generateOverallRiskChart(probabilityPercentage);

  try {
    return (
      <motion.div 
        className="max-w-4xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className={`px-6 py-4 ${prediction ? 'bg-red-600' : 'bg-green-600'}`}>
            <h2 className="text-2xl font-bold text-white">Your Diabetes Risk Assessment</h2>
            <p className="text-white opacity-90">Based on the parameters you provided</p>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center mb-8">
              <motion.div
                className={`text-2xl font-bold mb-3 ${riskColor}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {riskLevel} Risk Detected
              </motion.div>
              
              <motion.div 
                className="w-full bg-gray-200 rounded-full h-6 mb-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <motion.div 
                  className={`h-6 rounded-full ${progressColor} relative`}
                  initial={{ width: 0 }}
                  animate={{ width: `${probabilityPercentage}%` }}
                  transition={{ delay: 0.8, duration: 1.2 }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {probabilityPercentage}%
                  </span>
                </motion.div>
              </motion.div>
              
              <p className="text-sm text-gray-500 mb-6">
                {probabilityPercentage >= 70 ? '(High risk - Medical consultation recommended)' : 
                 probabilityPercentage >= 40 ? '(Moderate risk - Consider lifestyle changes)' : '(Low risk - Maintain healthy habits)'}
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 text-center mb-5">Key Health Parameters & Recommendations</h3>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ParameterInfo 
                  name="glucose" 
                  value={formData.glucose} 
                  title="Glucose Level"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ParameterInfo 
                  name="bmi" 
                  value={formData.bmi}
                  title="BMI" 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <ParameterInfo 
                  name="insulin" 
                  value={formData.insulin}
                  title="Insulin" 
                />
              </motion.div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">What does this mean?</h3>
              <p className="text-gray-600 mb-3">
                {probability >= 0.7 
                  ? 'Your results indicate a higher risk of diabetes. It is recommended to consult with a healthcare professional for further assessment and advice.'
                  : probability >= 0.4 
                    ? 'Your results indicate a moderate risk of diabetes. Consider discussing these results with your doctor during your next visit.'
                    : 'Your results indicate a lower risk of diabetes. However, maintaining a healthy lifestyle is still important for preventing future health issues.'
                }
              </p>
              <p className="text-gray-600">
                Remember, this tool is for informational purposes only and should not replace professional medical advice.
              </p>
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
  } catch (error) {
    console.error('Error in Results component:', error);
    return <Navigate to="/form" />;
  }
};

export default Results;