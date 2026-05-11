import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await axios.post(endpoint, formData);
      if (response.data.success) {
        login(response.data.user, response.data.token);
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
        >
          {/* Background Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin 
              ? (lang === 'en' ? 'Welcome Back' : 'वापसी पर स्वागत है') 
              : (lang === 'en' ? 'Create Account' : 'खाता बनाएं')}
          </h2>
          <p className="text-white/60 text-center mb-8">
            {isLogin 
              ? (lang === 'en' ? 'Connect with your harvest' : 'अपनी फसल से जुड़ें') 
              : (lang === 'en' ? 'Start your journey today' : 'आज ही अपनी यात्रा शुरू करें')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 relative">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-white/40" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder={lang === 'en' ? 'Full Name' : 'पूरा नाम'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-white/40" size={20} />
              <input
                type="email"
                name="email"
                placeholder={lang === 'en' ? 'Email Address' : 'ईमेल पता'}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-white/40" size={20} />
                <input
                  type="text"
                  name="phone"
                  placeholder={lang === 'en' ? 'Phone Number' : 'फ़ोन नंबर'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-white/40" size={20} />
              <input
                type="password"
                name="password"
                placeholder={lang === 'en' ? 'Password' : 'पासवर्ड'}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {!isLogin && (
              <div className="flex gap-4 p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'buyer' })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.role === 'buyer' ? 'bg-amber-500 text-white shadow-lg' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'I am Buyer' : 'मैं खरीदार हूं'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'farmer' })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.role === 'farmer' ? 'bg-emerald-600 text-white shadow-lg' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'I am Farmer' : 'मैं किसान हूं'}
                </button>
              </div>
            )}

            {error && <p className="text-red-400 text-sm font-medium text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? (lang === 'en' ? 'Sign In' : 'साइन इन') : (lang === 'en' ? 'Sign Up' : 'साइन अप'))}
            </button>
          </form>

          <p className="mt-6 text-center text-white/50 text-sm">
            {isLogin ? (lang === 'en' ? "Don't have an account?" : 'खाता नहीं है?') : (lang === 'en' ? 'Already have an account?' : 'क्या आपके पास पहले से एक खाता है?')}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              {isLogin ? (lang === 'en' ? 'Sign Up Free' : 'मुफ़्त पंजीकरण करें') : (lang === 'en' ? 'Sign In' : 'साइन इन')}
            </button>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;
