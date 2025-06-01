import React from 'react';
import { LayoutProps } from '../../types/index';
import Header from './Header';
import ApiStatus from '../common/ApiStatus';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <div className="fixed bottom-4 right-4">
        <ApiStatus />
      </div>
    </div>
  );
};

export default Layout; 