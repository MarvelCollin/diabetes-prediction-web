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
import { PredictionResult, DiabetesFormData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Health parameter reference ranges and recommendations
const healthParams = {
  glucose: {
    normal: { min: 70, max: 99 },
    prediabetic: { min: 100, max: 125 },
    diabetic: { min: 126, max: 400 },
    recommendations: {
      high: [
        "Reduce intake of refined sugars and carbohydrates",
        "Increase fiber consumption through vegetables, fruits, and whole grains",
        "Consider regular blood glucose monitoring",
        "Consult with a dietitian for a personalized meal plan"
      ],
      normal: [
        "Continue maintaining a balanced diet",
        "Regular exercise helps maintain healthy glucose levels"
      ]
    }
  },
  bloodPressure: {
    normal: { min: 90, max: 120 },
    elevated: { min: 121, max: 129 },
    hypertension1: { min: 130, max: 139 },
    hypertension2: { min: 140, max: 180 },
    recommendations: {
      high: [
        "Reduce sodium intake (aim for less than 1,500 mg per day)",
        "Adopt the DASH diet (rich in fruits, vegetables, and low-fat dairy)",
        "Regular physical activity (at least 150 minutes per week)",
        "Limit alcohol consumption and avoid smoking"
      ],
      normal: [
        "Maintain a healthy diet low in sodium",
        "Regular exercise helps control blood pressure"
      ]
    }
  },
  insulin: {
    normal: { min: 16, max: 166 },
    high: { min: 167, max: 1000 },
    recommendations: {
      high: [
        "Reduce consumption of processed foods and added sugars",
        "Eat smaller, more frequent meals throughout the day",
        "Include protein with each meal to help regulate insulin levels",
        "Consider intermittent fasting (consult your doctor first)"
      ],
      normal: [
        "Continue eating balanced meals with protein, healthy fats, and complex carbohydrates",
        "Regular physical activity helps maintain insulin sensitivity"
      ]
    }
  },
  bmi: {
    underweight: { min: 0, max: 18.4 },
    normal: { min: 18.5, max: 24.9 },
    overweight: { min: 25, max: 29.9 },
    obese: { min: 30, max: 100 },
    recommendations: {
      high: [
        "Focus on a caloric deficit through diet and exercise",
        "Aim for 150-300 minutes of moderate exercise per week",
        "Consider working with a dietitian for a personalized weight management plan",
        "Focus on sustainable lifestyle changes rather than rapid weight loss"
      ],
      normal: [
        "Continue maintaining a balanced diet and regular exercise routine",
        "Focus on quality nutrition and strength training for overall health"
      ],
      low: [
        "Increase caloric intake with nutrient-dense foods",
        "Focus on protein intake and strength training",
        "Consider consulting with a dietitian for a personalized plan"
      ]
    }
  }
};

const getRiskInterpretation = (probability: number): string => {
  if (probability >= 0.7) {
    return 'Your results indicate a high risk of diabetes. It is strongly recommended to consult with a healthcare professional for further assessment and advice.';
  } else if (probability >= 0.4) {
    return 'Your results indicate a moderate risk of diabetes. Consider discussing these results with your doctor during your next visit.';
  } else {
    return 'Your results indicate a lower risk of diabetes. However, maintaining a healthy lifestyle is still important for preventing future health issues.';
  }
};

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

// Function to determine specific parameter recommendations
const getParameterRecommendations = (formData: DiabetesFormData): Record<string, string[]> => {
  const recommendations: Record<string, string[]> = {};

  // Glucose recommendations
  if (formData.glucose > healthParams.glucose.prediabetic.min) {
    recommendations.glucose = healthParams.glucose.recommendations.high;
  } else {
    recommendations.glucose = healthParams.glucose.recommendations.normal;
  }

  // Blood pressure recommendations
  if (formData.bloodPressure > healthParams.bloodPressure.elevated.min) {
    recommendations.bloodPressure = healthParams.bloodPressure.recommendations.high;
  } else {
    recommendations.bloodPressure = healthParams.bloodPressure.recommendations.normal;
  }

  // Insulin recommendations
  if (formData.insulin > healthParams.insulin.normal.max) {
    recommendations.insulin = healthParams.insulin.recommendations.high;
  } else {
    recommendations.insulin = healthParams.insulin.recommendations.normal;
  }

  // BMI recommendations
  if (formData.bmi > healthParams.bmi.overweight.min) {
    recommendations.bmi = healthParams.bmi.recommendations.high;
  } else if (formData.bmi < healthParams.bmi.normal.min) {
    recommendations.bmi = healthParams.bmi.recommendations.low;
  } else {
    recommendations.bmi = healthParams.bmi.recommendations.normal;
  }

  return recommendations;
};

const getStatusClassForParameter = (name: string, value: number): string => {
  switch (name) {
    case 'glucose':
      if (value >= healthParams.glucose.diabetic.min) return 'text-red-600';
      if (value >= healthParams.glucose.prediabetic.min) return 'text-orange-500';
      return 'text-green-600';
    case 'bloodPressure':
      if (value >= healthParams.bloodPressure.hypertension2.min) return 'text-red-600';
      if (value >= healthParams.bloodPressure.hypertension1.min) return 'text-orange-500';
      if (value >= healthParams.bloodPressure.elevated.min) return 'text-yellow-500';
      return 'text-green-600';
    case 'insulin':
      if (value > healthParams.insulin.normal.max) return 'text-red-600';
      return 'text-green-600';
    case 'bmi':
      if (value >= healthParams.bmi.obese.min) return 'text-red-600';
      if (value >= healthParams.bmi.overweight.min) return 'text-orange-500';
      if (value < healthParams.bmi.normal.min) return 'text-yellow-500';
      return 'text-green-600';
    default:
      return 'text-gray-700';
  }
};

const prepareChartData = (formData: DiabetesFormData) => {
  // Reference values (typical healthy ranges)
  const referenceValues = {
    glucose: 90,
    bloodPressure: 110,
    insulin: 90,
    bmi: 22
  };

  const labels = ['Glucose', 'Blood Pressure', 'Insulin', 'BMI'];
  const userData = [
    formData.glucose,
    formData.bloodPressure,
    formData.insulin,
    formData.bmi
  ];
  const referenceData = [
    referenceValues.glucose,
    referenceValues.bloodPressure,
    referenceValues.insulin,
    referenceValues.bmi
  ];

  return {
    labels,
    datasets: [
      {
        label: 'Your Values',
        data: userData,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 1
      },
      {
        label: 'Reference Values',
        data: referenceData,
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(21, 128, 61)',
        borderWidth: 1
      }
    ]
  };
};

const Results: React.FC = () => {
  const location = useLocation();
  const result = location.state as PredictionResult;
  
  if (!result) {
    return <Navigate to="/form" />;
  }

  const { prediction, probability, formData } = result;
  const probabilityPercentage = Math.round(probability * 100);
  const interpretation = getRiskInterpretation(probability);
  const generalRecommendations = getRecommendations(probability);
  const parameterRecommendations = getParameterRecommendations(formData);
  
  const chartData = prepareChartData(formData);
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Your Health Parameters vs Reference Values',
      },
    },
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
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

          <div className="mb-8 h-72 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <Bar options={chartOptions} data={chartData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Your Health Parameters</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Glucose:</span>
                  <span className={getStatusClassForParameter('glucose', formData.glucose)}>
                    {formData.glucose} mg/dL
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Blood Pressure:</span>
                  <span className={getStatusClassForParameter('bloodPressure', formData.bloodPressure)}>
                    {formData.bloodPressure} mm Hg
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Insulin:</span>
                  <span className={getStatusClassForParameter('insulin', formData.insulin)}>
                    {formData.insulin} mu U/ml
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">BMI:</span>
                  <span className={getStatusClassForParameter('bmi', formData.bmi)}>
                    {formData.bmi}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Skin Thickness:</span>
                  <span className="text-gray-700">{formData.skinThickness} mm</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Pregnancies:</span>
                  <span className="text-gray-700">{formData.pregnancies}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-gray-700">Diabetes Pedigree:</span>
                  <span className="text-gray-700">{formData.diabetesPedigreeFunction}</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-gray-700">Age:</span>
                  <span className="text-gray-700">{formData.age} years</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">General Recommendations</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {generalRecommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Parameter-specific recommendations */}
          <div className="space-y-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Parameter-Specific Recommendations</h3>
            
            {/* Glucose */}
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-800">Glucose Management</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.glucose >= healthParams.glucose.diabetic.min ? 'bg-red-100 text-red-800' :
                  formData.glucose >= healthParams.glucose.prediabetic.min ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {formData.glucose >= healthParams.glucose.diabetic.min ? 'High Risk' :
                   formData.glucose >= healthParams.glucose.prediabetic.min ? 'Moderate Risk' :
                   'Normal'}
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                {parameterRecommendations.glucose.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </motion.div>
            
            {/* Blood Pressure */}
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-800">Blood Pressure Management</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.bloodPressure >= healthParams.bloodPressure.hypertension2.min ? 'bg-red-100 text-red-800' :
                  formData.bloodPressure >= healthParams.bloodPressure.hypertension1.min ? 'bg-orange-100 text-orange-800' :
                  formData.bloodPressure >= healthParams.bloodPressure.elevated.min ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {formData.bloodPressure >= healthParams.bloodPressure.hypertension2.min ? 'Stage 2 Hypertension' :
                   formData.bloodPressure >= healthParams.bloodPressure.hypertension1.min ? 'Stage 1 Hypertension' :
                   formData.bloodPressure >= healthParams.bloodPressure.elevated.min ? 'Elevated' :
                   'Normal'}
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                {parameterRecommendations.bloodPressure.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </motion.div>
            
            {/* BMI */}
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-800">Weight Management</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.bmi >= healthParams.bmi.obese.min ? 'bg-red-100 text-red-800' :
                  formData.bmi >= healthParams.bmi.overweight.min ? 'bg-orange-100 text-orange-800' :
                  formData.bmi < healthParams.bmi.normal.min ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {formData.bmi >= healthParams.bmi.obese.min ? 'Obese' :
                   formData.bmi >= healthParams.bmi.overweight.min ? 'Overweight' :
                   formData.bmi < healthParams.bmi.normal.min ? 'Underweight' :
                   'Normal'}
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                {parameterRecommendations.bmi.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </motion.div>
            
            {/* Insulin */}
            <motion.div 
              className="bg-gray-50 border border-gray-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-medium text-gray-800">Insulin Management</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  formData.insulin > healthParams.insulin.normal.max ? 'bg-red-100 text-red-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {formData.insulin > healthParams.insulin.normal.max ? 'Elevated' : 'Normal'}
                </span>
              </div>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-2">
                {parameterRecommendations.insulin.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </motion.div>
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