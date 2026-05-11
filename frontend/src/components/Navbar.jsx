import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Languages, LogIn, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ onOpenLogin }) => {
  const { lang, toggleLang } = useLanguage();
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: lang === 'en' ? 'Home' : 'मुख्य पृष्ठ', path: '/' },
    { name: lang === 'en' ? 'About Us' : 'हमारे बारे में', path: '/about' },
    { name: lang === 'en' ? 'Market Prices' : 'बाजार भाव', path: '/prices' },
    { name: lang === 'en' ? 'Advisory' : 'परामर्श', path: '/advisory' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-500 bg-clip-text text-transparent">
                Khet2City
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white hover:text-amber-400 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white hover:bg-white/30 transition-all font-semibold"
            >
              <Languages size={18} />
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>

            {token ? (
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">Hello, {user?.name?.split(' ')[0]}</span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-all shadow-lg"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                <LogIn size={18} />
                {lang === 'en' ? 'Join' : 'जुड़ें'}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleLang} className="text-white">
                <Languages size={24} />
             </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amber-400 transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-emerald-950/95 backdrop-blur-xl border-b border-white/10 pb-6 pt-2">
          <div className="px-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white text-lg font-medium border-b border-white/5 pb-2"
              >
                {item.name}
              </Link>
            ))}
            {!token && (
               <button
                  onClick={() => { setIsMenuOpen(false); onOpenLogin(); }}
                  className="w-full text-center py-3 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  {lang === 'en' ? 'Join Now' : 'अभी जुड़ें'}
                </button>
            )}
            {token && (
               <button onClick={logout} className="w-full text-center py-3 bg-red-600 text-white rounded-xl font-bold">
                  {lang === 'en' ? 'Logout' : 'लॉग आउट'}
               </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
