import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountUp = ({ value }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (typeof value !== 'number') return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    const duration = 1000;
    let startTime = null;
    
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{typeof value === 'number' ? count.toLocaleString() : value}</span>;
};

const MetricCard = ({ title, value, subtitle, icon, status, tooltip, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusColor = () => {
    switch(status) {
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const isNumeric = typeof value === 'number' || (typeof value === 'string' && value.match(/^[0-9]+$/));
  const numericValue = isNumeric ? parseInt(value.toString().replace(/,/g, '')) : value;
  const suffix = typeof value === 'string' && value.includes('ms') ? 'ms' : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 100 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-gray-500 font-medium text-sm">{title}</h3>
        <div className={`p-2 rounded-lg border ${getStatusColor()}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-900 mb-1 truncate flex items-baseline">
          {isNumeric ? <CountUp value={numericValue} /> : value}
          <span className="text-sm ml-1 text-gray-500 font-medium">{suffix}</span>
        </div>
        {subtitle && <p className={`text-sm font-medium ${status === 'error' ? 'text-error' : status === 'warning' ? 'text-warning' : 'text-gray-500'}`}>{subtitle}</p>}
      </div>

      <AnimatePresence>
        {isHovered && tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-textMain text-xs text-background px-3 py-2 rounded-lg whitespace-nowrap shadow-xl z-10 pointer-events-none"
          >
            {tooltip}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-textMain rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MetricCard;
