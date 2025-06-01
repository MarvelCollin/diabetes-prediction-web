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
      
      
    </motion.div>
  );
};

export default Welcome; 