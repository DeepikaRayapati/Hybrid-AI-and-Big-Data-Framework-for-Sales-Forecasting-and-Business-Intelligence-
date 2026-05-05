import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  isLoggedIn: boolean;
}

export default function Hero({ isLoggedIn }: HeroProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with dynamic overlay */}
      <div className="absolute inset-0 bg-[#007AFF] z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#007AFF]/80 via-[#007AFF]/60 to-[#007AFF] z-10" />
      </div>

      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Retail Sales Prediction System
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-blue-50/90 mb-6 font-medium"
        >
          Predict Future Sales with AI & Big Data
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100/90 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          This system uses a Hybrid AI and Big Data Framework to forecast future retail sales and optimize inventory management for better business intelligence.
        </motion.p>
        
        {!isLoggedIn && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto bg-white text-[#007AFF] px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all shadow-xl"
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Register
            </button>
          </motion.div>
        )}
      </div>

      {/* Abstract shapes for depth */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute top-24 -right-24 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-20 pointer-events-none" />
    </div>
  );
}
