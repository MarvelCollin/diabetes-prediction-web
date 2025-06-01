import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-indigo-600">
              Diabetes Prediction
            </h1>
          </motion.div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`text-lg ${isActive('/') ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/form" 
                  className={`text-lg ${isActive('/form') ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
                >
                  Prediction Form
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 