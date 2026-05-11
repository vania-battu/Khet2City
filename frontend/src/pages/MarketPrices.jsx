import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, TrendingDown, Search, ArrowRight, Table, RefreshCw, BarChart2 } from 'lucide-react';

const MarketPrices = () => {
  const { lang } = useLanguage();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/prices');
      if (res.data.success) {
        setPrices(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(p => 
    p.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 natural-harvest-gradient text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <section className="mb-12 flex flex-col lg:flex-row justify-between items-end gap-6">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-black mb-4">
               {lang === 'en' ? "Agmarknet Live Prices" : "अगमैकमार्केट लाइव भाव"}
            </h1>
            <p className="text-xl text-white/60">
               {lang === 'en' ? "Real-time daily market price benchmarks across India." : "भारत भर में वास्तविक समय के दैनिक बाजार मूल्य मानदंड।"}
            </p>
          </div>
          
          <div className="w-full lg:w-[400px] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder={lang === 'en' ? "Search commodity..." : "वस्तु खोजें..."}
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-bold"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* Price Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
           {loading ? (
             Array(6).fill(0).map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                  <div className="h-8 bg-white/10 rounded w-3/4" />
                </div>
             ))
           ) : filteredPrices.map((item, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.05 }}
               className="glass-card p-6 rounded-3xl group hover:border-emerald-500/50 transition-all"
             >
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2 text-xs font-bold uppercase text-white/40 tracking-wider">
                      <BarChart2 size={14} />
                      {lang === 'en' ? 'Daily Price' : 'दैनिक भाव'}
                   </div>
                   <span className={`px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1 ${
                     item.status === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                   }`}>
                      {item.status === 'up' ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
                      {item.change}
                   </span>
                </div>
                <h3 className="text-2xl font-black mb-1">{item.commodity}</h3>
                <div className="text-3xl font-black text-amber-400">₹{item.price} <span className="text-sm font-medium text-white/40">/ qtl</span></div>
             </motion.div>
           ))}
        </div>

        {/* Detailed Table */}
        <div className="glass-card rounded-[40px] overflow-hidden">
           <div className="p-8 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <Table className="text-emerald-400" />
                 <h2 className="text-2xl font-bold">{lang === 'en' ? "Full Price Listing" : "पूरी सूची"}</h2>
              </div>
              <button onClick={fetchPrices} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                 <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-white/5 text-white/40 text-xs font-bold uppercase tracking-widest">
                    <th className="px-8 py-6">Commodity</th>
                    <th className="px-8 py-6">Current Price</th>
                    <th className="px-8 py-6">Market Trend</th>
                    <th className="px-8 py-6">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredPrices.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors group">
                       <td className="px-8 py-6 font-bold text-lg">{item.commodity}</td>
                       <td className="px-8 py-6">
                         <span className="text-amber-400 font-bold text-xl">₹{item.price}</span>
                       </td>
                       <td className="px-8 py-6">
                         <span className={`flex items-center gap-2 font-bold ${item.status === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {item.status === 'up' ? <TrendingUp size={20}/> : <TrendingDown size={20}/>}
                            {item.change}
                         </span>
                       </td>
                       <td className="px-8 py-6">
                          <button className="flex items-center gap-2 text-white/40 group-hover:text-amber-400 transition-colors font-bold text-sm">
                             View Analysis <ArrowRight size={16} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MarketPrices;
