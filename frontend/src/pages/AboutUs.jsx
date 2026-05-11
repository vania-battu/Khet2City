import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Zap, Users, Globe, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const AboutUs = () => {
  const { lang } = useLanguage();

  const impactData = [
    { 
      name: lang === 'en' ? 'Income' : 'आय', 
      value: 40, 
      display: '+40%',
      label_en: "Farmer Growth",
      label_hi: "किसान की वृद्धि"
    },
    { 
      name: lang === 'en' ? 'Savings' : 'बचत', 
      value: 20, 
      display: '20%',
      label_en: "Consumer Savings",
      label_hi: "उपभोक्ता बचत"
    },
    { 
      name: lang === 'en' ? 'Freshness' : 'ताजगी', 
      value: 60, 
      display: '48h+',
      label_en: "Hours Faster",
      label_hi: "घंटे तेज़"
    }
  ];

  const distributionData = [
    { name: lang === 'en' ? 'Organic Tech' : 'जैविक तकनीक', value: 45, color: '#10b981' },
    { name: lang === 'en' ? 'Market Insights' : 'बाजार अंतर्दृष्टि', value: 30, color: '#f59e0b' },
    { name: lang === 'en' ? 'Sustainable Tech' : 'सतत तकनीक', value: 15, color: '#3b82f6' },
    { name: lang === 'en' ? 'Community' : 'सामुदायिक', value: 10, color: '#8b5cf6' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 natural-harvest-gradient text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Mission Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center gap-4 mb-6">
             <span className="px-4 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase border border-white/10">About Khet2City</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
            Direct. <span className="text-emerald-400">Fresh.</span> Transparent.
          </h1>
          <p className="text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            {lang === 'en' 
              ? "Khet2City is a digital revolution for the Indian agricultural landscape. We dismantle the traditional, multi-layered 'Mandi' system to bridge the gap between rural farmers and urban consumers."
              : "Khet2City भारतीय कृषि परिदृश्य के लिए एक डिजिटल क्रांति है। हम ग्रामीण किसानों और शहरी उपभोक्ताओं के बीच की खाई को पाटने के लिए पारंपरिक, बहु-स्तरीय 'मंडी' प्रणाली को खत्म करते हैं।"}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Impact Chart Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-[32px]"
          >
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 className="text-emerald-400" />
              <h2 className="text-2xl font-bold">{lang === 'en' ? "Impact in Numbers" : "संख्याओं में प्रभाव"}</h2>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              {impactData.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{item.display}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40">{lang === 'en' ? item.label_en : item.label_hi}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Economic Vision Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-10 rounded-[32px] flex-1">
               <h2 className="text-3xl font-bold mb-6 text-amber-400">
                 {lang === 'en' ? "The Economic Vision" : "आर्थिक दृष्टिकोण"}
               </h2>
               <p className="text-white/70 mb-8 leading-relaxed">
                 {lang === 'en' 
                   ? "Agriculture contributes 15-18% to the national GDP. However, inefficiency leads to ₹92,000 crores in annual post-harvest losses. Khet2City aims to reclaim this value."
                   : "कृषि राष्ट्रीय सकल घरेलू उत्पाद (जीडीपी) में 15-18% का योगदान करती है। हालांकि, अक्षमता के कारण वार्षिक तौर पर ₹92,000 करोड़ का फसल पश्चात नुकसान होता है। Khet2City का लक्ष्य इस मूल्य को पुनः प्राप्त करना है।"}
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <span className="block text-2xl font-bold text-white tracking-tighter">0.5% - 1.0%</span>
                     <span className="text-xs text-white/40 uppercase">GDP Potential</span>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <span className="block text-2xl font-bold text-white tracking-tighter">₹92,000 Cr</span>
                     <span className="text-xs text-white/40 uppercase">Value Reclaimed</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Knowledge Arena Distribution */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 lg:p-12 rounded-[40px] flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <PieChartIcon className="text-amber-400" />
                <h2 className="text-3xl font-bold">{lang === 'en' ? "Knowledge Arena Content" : "नॉलेज एरिना सामग्री"}</h2>
              </div>
              <p className="text-xl text-white/60 mb-8 leading-relaxed">
                {lang === 'en' 
                  ? "More than a marketplace—a hub for agricultural intelligence. Our community-driven insights are strategically distributed to maximize farmer success."
                  : "एक बाजार से कहीं अधिक—कृषि बुद्धिमत्ता का एक केंद्र। हमारे समुदाय-संचालित अंतर्दृष्टि को किसान की सफलता को अधिकतम करने के लिए रणनीतिक रूप से वितरित किया जाता है।"}
              </p>
              <div className="space-y-4">
                 {distributionData.map((item, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <div className="flex-1 text-white/80">{item.name}</div>
                      <div className="font-bold">{item.value}%</div>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="w-[300px] h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Why We Exist */}
        <section className="grid md:grid-cols-3 gap-8">
           {[
             { icon: <Zap />, title_en: "Eliminate Middlemen", title_hi: "बिचौलियों को खत्म करें", desc_en: "Removing 3–4 layers of intermediaries.", desc_hi: "मध्यस्थों की 3-4 परतों को हटाना।" },
             { icon: <Globe />, title_en: "Foster Inclusion", title_hi: "समावेशन को बढ़ावा दें", desc_en: "Connecting rural producers directly to urban demand.", desc_hi: "ग्रामीण उत्पादकों को सीधे शहरी मांग से जोड़ना।" },
             { icon: <Leaf />, title_en: "Ensure Sustainability", title_hi: "स्थिरता सुनिश्चित करें", desc_en: "Promoting organic practices via community insights.", desc_hi: "सामुदायिक अंतर्दृष्टि के माध्यम से जैविक प्रथाओं को बढ़ावा देना।" }
           ].map((item, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
             >
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-amber-400">
                 {item.icon}
               </div>
               <h3 className="text-xl font-bold mb-4">{lang === 'en' ? item.title_en : item.title_hi}</h3>
               <p className="text-white/50">{lang === 'en' ? item.desc_en : item.desc_hi}</p>
             </motion.div>
           ))}
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
