/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Predict from './components/Predict';
import ModelMetrics from './components/ModelMetrics';
import Inventory from './components/Inventory';
import Feedback from './components/Feedback';
import About from './components/About';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function HomePage({ isLoggedIn, showSuccess, setShowSuccess }: { 
  isLoggedIn: boolean, 
  showSuccess: boolean, 
  setShowSuccess: (val: boolean) => void
}) {
  return (
    <>
      <main>
        <Hero isLoggedIn={isLoggedIn} />
        
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6 mt-8"
            >
              <div className="bg-[#E0F7FA] border border-[#B2EBF2] text-[#006064] px-6 py-4 rounded-xl flex items-center justify-between shadow-sm">
                <span className="font-medium text-sm md:text-base">Logged in successfully!</span>
                <button onClick={() => setShowSuccess(false)} className="p-1 hover:bg-[#B2EBF2] rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Dashboard />
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm italic">© 2024 Retail Sales Prediction System. Built with Hybrid AI Technology.</p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = (user: { email: string; name: string }) => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setShowSuccess(true);
    // Auto hide after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    setShowSuccess(false);
  };

  const isLoggedIn = !!currentUser;

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            <HomePage 
              isLoggedIn={isLoggedIn} 
              showSuccess={showSuccess} 
              setShowSuccess={setShowSuccess} 
            />
          } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleLogin} />} />
          <Route path="/predict" element={<Predict currentUser={currentUser} />} />
          <Route path="/metrics" element={<ModelMetrics />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/feedback" element={<Feedback currentUser={currentUser} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}


