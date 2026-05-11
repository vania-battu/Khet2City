import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquarePlus, BadgeCheck, Users, Search, 
  Leaf, Bug, Droplets, Info, Filter, Send, Loader2
} from 'lucide-react';

const KnowledgeArena = () => {
  const { lang } = useLanguage();
  const { token, user } = useAuth();
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'professional', 'community'
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', type: 'Organic Techniques' });
  const [submitting, setSubmitting] = useState(false);

  const fetchAdvisories = async () => {
    try {
      const res = await axios.get('/api/advisory');
      if (res.data.success) {
        setAdvisories(res.data.advisories);
      }
    } catch (err) {
      console.error("Failed to fetch advisories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisories();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.post('/api/advisory', newPost, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setAdvisories([res.data.advisory, ...advisories]);
        setIsPosting(false);
        setNewPost({ title: '', content: '', type: 'Organic Techniques' });
      }
    } catch (err) {
      alert("Failed to submit advisory. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAdvisories = advisories.filter(item => {
    if (filter === 'professional') return item.isProfessional;
    if (filter === 'community') return !item.isProfessional;
    return true;
  });

  const categories = [
    'Organic Techniques', 'Market Insights', 'Sustainable Tech', 
    'Community Wisdom', 'Pest', 'Fertilizer', 'Technology'
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 natural-harvest-gradient text-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Knowledge Arena</h1>
            <p className="text-white/60">{lang === 'en' ? "Empowering farmers with community-driven data." : "सामुदाय-संचालित डेटा के साथ किसानों को सशक्त बनाना।"}</p>
          </div>
          
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-900 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all"
          >
            <MessageSquarePlus size={20} />
            {lang === 'en' ? "Share Insight" : "अंतर्दृष्टि साझा करें"}
          </button>
        </header>

        {/* Post Form */}
        <AnimatePresence>
          {isPosting && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="glass-card mb-12 overflow-hidden rounded-[32px]"
            >
              <form onSubmit={handlePost} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-1">Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Drip Irrigation Hack"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                      value={newPost.title}
                      onChange={e => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-1">Category</label>
                    <select 
                      className="w-full bg-white/10 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all text-white"
                      value={newPost.type}
                      onChange={e => setNewPost({...newPost, type: e.target.value})}
                    >
                      {categories.map(cat => <option key={cat} value={cat} className="bg-emerald-900">{cat}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Insight Content</label>
                  <textarea 
                    required
                    rows="4"
                    placeholder="Describe your technique or observation..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none"
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                  />
                </div>

                <div className="flex justify-end gap-4">
                   <button 
                     type="button" 
                     onClick={() => setIsPosting(false)}
                     className="px-6 py-2 text-white/60 hover:text-white transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     disabled={submitting}
                     className="px-10 py-3 bg-emerald-600 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-colors"
                   >
                     {submitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                     Post Now
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
           {[
             { id: 'all', label: lang === 'en' ? 'All Pulse' : 'सभी फीड', icon: <Search size={16} /> },
             { id: 'professional', label: lang === 'en' ? 'Expert Insights' : 'विशेषज्ञ राय', icon: <BadgeCheck size={16} /> },
             { id: 'community', label: lang === 'en' ? 'Community Wisdom' : 'सामुदायिक ज्ञान', icon: <Users size={16} /> }
           ].map(item => (
             <button
               key={item.id}
               onClick={() => setFilter(item.id)}
               className={`flex items-center gap-2 px-5 py-2 whitespace-nowrap rounded-full font-bold transition-all border ${
                 filter === item.id 
                  ? 'bg-amber-500 border-amber-400 text-white shadow-lg' 
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
               }`}
             >
               {item.icon}
               {item.label}
             </button>
           ))}
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {loading ? (
             <div className="text-center py-20 opacity-50"><Loader2 className="animate-spin mx-auto mb-4" /> Loading feed...</div>
          ) : filteredAdvisories.map((advisory) => (
            <motion.article
              layout
              key={advisory._id || advisory.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative glass-card p-8 rounded-[32px] overflow-hidden transition-all hover:scale-[1.01] ${
                advisory.isProfessional ? 'ring-2 ring-amber-500/50 bg-amber-900/10' : ''
              }`}
            >
              {advisory.isProfessional && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-transparent pl-12 pr-6 py-2 flex items-center gap-2 rounded-bl-3xl">
                   <BadgeCheck size={18} className="text-white" />
                   <span className="text-[10px] font-black uppercase tracking-tighter text-white">Verified Expert</span>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                    <Leaf size={14} />
                    {advisory.type}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{advisory.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6 font-medium">
                    {advisory.content}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                       {advisory.author?.charAt(0)}
                    </div>
                    <div>
                        <div className="text-xs font-bold">{advisory.author}</div>
                        <div className="text-[10px] text-white/40">{new Date(advisory.createdAt || Date.now()).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
          {!loading && filteredAdvisories.length === 0 && (
             <div className="text-center py-20 bg-white/5 rounded-[40px] border border-white/5 text-white/40 italic">
               No insights found in this category yet. Be the first to share!
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default KnowledgeArena;
