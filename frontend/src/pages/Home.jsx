import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, TrendingDown, Layers, Target, ShoppingBag } from 'lucide-react';

const Home = ({ onOpenLogin }) => {
  const { lang } = useLanguage();
  const { token } = useAuth();

  const problemCards = [
    {
      icon: <TrendingDown className="text-amber-400" size={32} />,
      title_en: "₹92K Crore",
      title_hi: "₹92K करोड़",
      desc_en: "Post-harvest loss annually",
      desc_hi: "वार्षिक फसल हानि",
      delay: 0.2
    },
    {
      icon: <Layers className="text-emerald-400" size={32} />,
      title_en: "3-4 Layers",
      title_hi: "3-4 परतें",
      desc_en: "Middlemen strata",
      desc_hi: "बिचौलिए के स्तर",
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen pt-16 natural-harvest-gradient text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left z-10"
        >
          <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
            {lang === 'en' ? (
              <>Farm Fresh, <span className="text-amber-400">No Middlemen</span></>
            ) : (
              <>खेत से शहर तक, <span className="text-amber-400">बिना बिचौलिए</span></>
            )}
          </h1>
          <p className="text-xl lg:text-2xl text-white/80 mb-10 max-w-2xl mx-auto lg:mx-0">
            {lang === 'en' 
              ? "Bridging the gap between rural fields and urban pulses. Direct commerce for a fairer economy." 
              : "ग्रामीण खेतों और शहरी नब्ज के बीच की खाई को पाटना। निष्पक्ष अर्थव्यवस्था के लिए प्रत्यक्ष वाणिज्य।"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={onOpenLogin}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all group"
            >
              {lang === 'en' ? "Explore" : "अन्वेषण करें"}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-2xl font-bold text-lg transition-all">
              <ShoppingBag size={20} />
              {lang === 'en' ? "Marketplace" : "बाजार"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex-1 relative"
        >
          {/* Antigravity Farmer Image */}
          <div className="relative z-10 antigravity-float">
             <img 
               src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200" 
               alt="Farmer" 
               className="rounded-3xl shadow-2xl border-4 border-white/20 rotate-3"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent rounded-3xl" />
          </div>
          
          {/* Decorative floating stats */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 -right-4 lg:-right-8 bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl z-20"
          >
            <div className="text-amber-400 font-bold text-xl">+40%</div>
            <div className="text-xs text-white/60">Farmer Income</div>
          </motion.div>
        </motion.div>
      </section>

      {/* The Problem Section */}
      <section className="px-6 py-20 relative z-10 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              {lang === 'en' ? "The Bottleneck we Solve" : "वह बाधा जिसे हम हल करते हैं"}
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problemCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
                className="glass-card p-10 rounded-[32px] text-center group hover:border-amber-500/50 transition-all cursor-default"
              >
                <div className="mb-6 inline-block p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-4xl font-extrabold mb-2 text-amber-400">
                  {lang === 'en' ? card.title_en : card.title_hi}
                </h3>
                <p className="text-xl text-white/70">
                  {lang === 'en' ? card.desc_en : card.desc_hi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer Quote */}
      <footer className="py-12 px-6 text-center text-white/40">
        <div className="flex justify-center items-center gap-2 mb-4">
           <Target size={16} />
           <span className="tracking-widest uppercase text-xs font-bold">Khet2City Mission</span>
        </div>
        <p className="max-w-xl mx-auto italic">
          {lang === 'en' 
            ? "From the Heart of the Field to the Pulse of the City." 
            : "खेत के दिल से लेकर शहर की नब्ज तक।"}
        </p>
      </footer>
    </div>
  );
};

export default Home;
