import { Zap, Search, LayoutTemplate, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import URLInput from './URLInput';

const Hero = ({ onAnalyze, isLoading }) => {
  const badges = [
    { icon: <Zap className="w-4 h-4 text-warning" />, text: "Fast Analysis" },
    { icon: <Search className="w-4 h-4 text-primary" />, text: "SEO Audit" },
    { icon: <LayoutTemplate className="w-4 h-4 text-success" />, text: "HTML Structure" },
    { icon: <ShieldCheck className="w-4 h-4 text-primaryGradientEnd" />, text: "Accessibility" }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center text-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Page Pulse v2.0 Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
          Analyze Any Website <br />
          <span className="text-primary">
            In Seconds.
          </span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-6 font-medium">
          Get instant technical, SEO and accessibility insights for any website with one click.
        </p>

        <URLInput onAnalyze={onAnalyze} isLoading={isLoading} />

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {badges.map((badge, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              className="group flex items-center gap-2 bg-white border border-gray-200 hover:border-primary/50 hover:shadow-md px-4 py-2 rounded-full transition-all duration-300 cursor-default"
            >
              {badge.icon}
              <span className="text-sm font-medium text-gray-900">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
