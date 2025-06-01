import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Welcome to Diabetes Prediction App
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Early detection of diabetes risk can help in prevention and management. 
          Use our advanced AI tool to assess your risk based on medical parameters.
        </motion.p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            to="/form" 
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-8 py-3 text-lg transition-colors"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Quick Assessment</h3>
          <p className="text-gray-600">Get a quick risk assessment based on your health parameters in just a few minutes.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">AI Powered</h3>
          <p className="text-gray-600">Our machine learning algorithm provides accurate risk prediction based on medical research.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Privacy Focused</h3>
          <p className="text-gray-600">Your health data stays private and secure with our confidential assessment system.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome; 