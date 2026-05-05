import { TrendingUp, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export default function Navbar({ isLoggedIn, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(isLoggedIn ? [
      { name: 'Predict', path: '/predict' },
      { name: 'Model Metrics', path: '/metrics' },
      { name: 'Inventory', path: '/inventory' },
      { name: 'Feedback', path: '/feedback' },
    ] : []),
    { name: 'About Us', path: '/about' },
  ];

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#007AFF] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity flex-shrink-0">
          <TrendingUp size={28} className="text-white" />
          <span className="text-xl font-bold tracking-tight">Retail Sales Prediction System</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname === link.path ? 'text-white' : 'text-blue-100 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold hover:bg-white/10 rounded-lg transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#007AFF] px-5 py-2 text-sm font-bold rounded-lg hover:bg-blue-50 transition-all shadow-md"
                >
                  Register
                </button>
              </>
            ) : (
              <button 
                onClick={handleLogoutClick}
                className="border border-white text-white px-5 py-2 text-sm font-bold rounded-lg hover:bg-white hover:text-[#007AFF] transition-all"
              >
                Logout
              </button>
            )}
          </div>

          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#007AFF] border-t border-blue-400 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium text-blue-50 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-blue-400 mt-2 flex flex-col gap-3">
                {!isLoggedIn ? (
                  <>
                    <button 
                      onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                      className="w-full py-3 text-sm font-bold text-center border border-white rounded-xl"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => { navigate('/register'); setIsMenuOpen(false); }}
                      className="w-full py-3 text-sm font-bold text-[#007AFF] bg-white rounded-xl"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLogoutClick}
                    className="w-full py-3 text-sm font-bold text-center bg-white text-[#007AFF] rounded-xl"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
