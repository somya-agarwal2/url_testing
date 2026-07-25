import React, { useState } from 'react';
import MetricCard from './MetricCard';
import { Clock, CheckCircle2, Type, Image as ImageIcon, Link, FileText, Download, Copy, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuditCard = ({ data }) => {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const getResponseTimeStatus = (ms) => {
    if (ms < 500) return 'success';
    if (ms < 1500) return 'warning';
    return 'error';
  };

  const getMissingAltStatus = (missing, total) => {
    if (total === 0) return 'success';
    const ratio = missing / total;
    if (ratio === 0) return 'success';
    if (ratio < 0.2) return 'warning';
    return 'error';
  };

  const getStatusCodeColor = (code) => {
    if (code >= 200 && code < 300) return 'text-success bg-success/10 border-success/20';
    if (code >= 300 && code < 400) return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    if (code >= 400 && code < 500) return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    return 'text-error bg-error/10 border-error/20';
  };

  // SEO Score Calculation
  let seoScore = 0;
  if (data.protocol === 'HTTPS') seoScore += 20;
  if (data.title && data.title.length > 0) seoScore += 20;
  if (data.meta_description && data.meta_description !== 'No meta description found') seoScore += 20;
  if (data.h1_count > 0) seoScore += 20;
  if (data.total_images === 0 || data.missing_alt === 0) seoScore += 20;

  const getScoreStatus = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'success' };
    if (score >= 70) return { label: 'Good', color: 'primary' };
    if (score >= 50) return { label: 'Average', color: 'warning' };
    return { label: 'Needs Improvement', color: 'error' };
  };
  const scoreData = getScoreStatus(seoScore);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied('✓ Report copied to clipboard');
    } catch (err) {
      setCopied('Unable to copy report');
    }
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-report.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const domain = data.url ? new URL(data.url).hostname : '';

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 px-4">
      {/* Action Buttons & Toast */}
      <div className="flex justify-end gap-3 mb-4 relative z-20">
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-colors shadow-sm"
        >
          <Copy className="w-4 h-4" /> Copy JSON
        </button>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-900 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" /> Download JSON
        </button>
        
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`absolute top-12 right-32 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl ${copied.includes('Unable') ? 'bg-error' : 'bg-success'}`}
            >
              {copied}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="mb-8 p-6 bg-white border border-gray-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="flex items-center gap-4 relative z-10">
          {domain && (
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-200 overflow-hidden shrink-0">
              <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="favicon" className="w-full h-full object-contain" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              🌐 {domain || 'Website'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {data.url || 'Analyzed URL'}
            </p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-wrap gap-4 relative z-10">
          <div className={`px-5 py-3 rounded-xl border ${getStatusCodeColor(data.status)}`}>
            <span className="text-xs uppercase tracking-wider block mb-1 opacity-80 font-bold">Status Code</span>
            <span className="text-2xl font-bold">{data.status}</span>
          </div>
          <div className="px-5 py-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1 font-bold">Protocol</span>
            <span className="text-2xl font-bold text-primary">{data.protocol}</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <MetricCard 
          title="SEO Score" 
          value={`${seoScore} / 100`} 
          subtitle={scoreData.label}
          icon={<ShieldCheck className="w-6 h-6" />}
          status={scoreData.color}
          tooltip="Calculated using basic SEO best practices."
          delay={0.1}
        />
        <MetricCard 
          title="Response Time" 
          value={data.response_time} 
          subtitle={getResponseTimeStatus(data.response_time) === 'success' ? 'Fast' : 'Needs Optimization'}
          icon={<Clock className="w-6 h-6" />}
          status={getResponseTimeStatus(data.response_time)}
          tooltip="Time taken for the server to respond."
          delay={0.2}
        />
        <MetricCard 
          title="Word Count" 
          value={data.word_count} 
          subtitle="Approximate text content"
          icon={<Type className="w-6 h-6" />}
          status={data.word_count > 300 ? 'success' : 'warning'}
          tooltip="Approximate number of visible words."
          delay={0.3}
        />
        <MetricCard 
          title="Images Missing Alt" 
          value={data.missing_alt} 
          subtitle={`Out of ${data.total_images} total images`}
          icon={<ImageIcon className="w-6 h-6" />}
          status={getMissingAltStatus(data.missing_alt, data.total_images)}
          tooltip="Images without accessibility descriptions."
          delay={0.4}
        />
        <MetricCard 
          title="H1 Count" 
          value={data.h1_count} 
          subtitle={data.h1_count === 1 ? 'Optimal structure' : 'Check heading structure'}
          icon={<CheckCircle2 className="w-6 h-6" />}
          status={data.h1_count === 1 ? 'success' : (data.h1_count === 0 ? 'error' : 'warning')}
          tooltip="Number of primary page headings."
          delay={0.5}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Meta Information</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block">Page Title</span>
            <p className="text-gray-900 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
              {data.title || <span className="text-gray-500 italic">No title found</span>}
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 font-bold block">Meta Description</span>
            <p className="text-gray-900 text-sm bg-gray-50 p-4 rounded-xl border border-gray-200">
              {data.meta_description || <span className="text-gray-500 italic">No meta description found</span>}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditCard;
