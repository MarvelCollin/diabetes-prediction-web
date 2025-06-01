import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Welcome from './components/pages/Welcome';
import DiabetesForm from './components/pages/DiabetesForm';
import Results from './components/pages/Results';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/form" element={<DiabetesForm />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App; 