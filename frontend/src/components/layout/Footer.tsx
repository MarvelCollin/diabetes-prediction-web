import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Diabetes Prediction App</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Privacy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Terms</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 