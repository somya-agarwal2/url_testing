import { useState } from 'react';
import { Link, Cpu, FileText, Clock, Search, ShieldCheck, LayoutTemplate, Globe, FileCode, Zap, Lock, Target, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import AuditCard from '../components/AuditCard';
import ErrorCard from '../components/ErrorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { performAudit } from '../services/api';

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await performAudit(url);
      setResult(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const showMarketing = !loading && !result && !error;

  return (
    <div className="pb-20">
      <Hero onAnalyze={handleAnalyze} isLoading={loading} />
      
      <div className="px-4 w-full max-w-7xl mx-auto relative z-10 mt-8">
        {loading && (
          <div className="min-h-[400px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="min-h-[400px]">
            <ErrorCard message={error} />
          </div>
        )}
        {result && !loading && !error && (
          <div className="min-h-[400px]">
            <AuditCard data={result} />
          </div>
        )}
      </div>

      {showMarketing && (
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-16">
          
          {/* How It Works */}
          <section id="how-it-works" className="relative py-8">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10 rounded-full blur-3xl"></div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">How it Works</h2>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">Get comprehensive insights in three simple steps.</p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {[
                { icon: <Link className="w-5 h-5" />, title: "Paste URL", desc: "Enter any public website address." },
                { icon: <Cpu className="w-5 h-5" />, title: "Analyze Website", desc: "Our engine scans the page instantly." },
                { icon: <FileText className="w-5 h-5" />, title: "View Report", desc: "Get actionable SEO & technical data." }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center w-full md:w-auto">
                  <div className="flex flex-col items-center flex-1 bg-white border border-gray-200 p-6 rounded-2xl shadow-xl w-full md:w-64">
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-primary mb-4 shadow-sm">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 text-center">{step.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:flex text-borderSubtle mx-4">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section id="features" className="py-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Comprehensive Audit</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything you need to know about your website's technical health.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Clock className="w-4 h-4" />, title: "Response Time", desc: "Measure website performance and server latency instantly." },
                { icon: <Search className="w-4 h-4" />, title: "SEO Metrics", desc: "Analyze titles, meta descriptions, headings, and keywords." },
                { icon: <ShieldCheck className="w-4 h-4" />, title: "Accessibility", desc: "Find missing alt attributes and ensure broad usability." },
                { icon: <LayoutTemplate className="w-4 h-4" />, title: "HTML Structure", desc: "Inspect page structure, semantic tags, and document hierarchy." },
                { icon: <Globe className="w-4 h-4" />, title: "Protocol Detection", desc: "Detect HTTPS support and secure connection protocols." },
                { icon: <FileCode className="w-4 h-4" />, title: "Professional Reports", desc: "Clean, actionable data presented in an easy-to-read format." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
                  <div className="bg-white border border-gray-200 w-8 h-8 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sample Report Mockup */}
          <section className="relative py-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Professional Output</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Clean, readable, and actionable insights.</p>
            </div>
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10 mt-16"></div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
              {/* Browser Header */}
              <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto bg-white border border-gray-200 rounded-md px-16 sm:px-32 py-1 flex items-center gap-2 text-xs text-gray-500 font-medium shadow-sm">
                  <Lock className="w-3 h-3 text-gray-500/70" /> example.com/audit
                </div>
              </div>
              
              {/* Mockup Body matching AuditCard */}
              <div className="p-6 md:p-8 bg-white">
                <div className="mb-6 p-5 bg-white border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-200">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">example.com</h3>
                      <p className="text-gray-500 text-xs mt-0.5">https://example.com</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-3">
                    <div className="px-3 py-1.5 rounded-lg border border-success/20 bg-success/10">
                      <span className="text-[10px] uppercase tracking-wider block text-success/80 font-bold">Status</span>
                      <span className="text-sm font-bold text-success">200 OK</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50">
                      <span className="text-[10px] uppercase tracking-wider block text-gray-500 font-bold">Protocol</span>
                      <span className="text-sm font-bold text-primary">HTTPS</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "SEO Score", val: "98 / 100", sub: "Excellent", col: "text-success" },
                    { label: "Response Time", val: "124ms", sub: "Fast", col: "text-success" },
                    { label: "Word Count", val: "1,245", sub: "Optimal content", col: "text-gray-900" },
                    { label: "H1 Tags", val: "1", sub: "Optimal structure", col: "text-success" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
                      <div className="text-gray-500 text-xs font-medium mb-1">{stat.label}</div>
                      <div className={`text-xl font-bold ${stat.col} mb-1`}>{stat.val}</div>
                      <div className="text-gray-500 text-[11px]">{stat.sub}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold text-gray-900">Meta Information</h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] uppercase text-gray-500 font-bold mb-1.5">Page Title</div>
                      <div className="text-sm text-gray-900 bg-gray-50 border border-gray-200 p-3 rounded-lg">Example Domain</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Page Pulse */}
          <section className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Zap className="w-6 h-6 text-primary" />, title: "Lightning Fast", desc: "Get results in milliseconds with our optimized engine." },
                { icon: <Lock className="w-6 h-6 text-primary" />, title: "Secure & Private", desc: "No data is stored. Your audits remain completely private." },
                { icon: <Target className="w-6 h-6 text-primary" />, title: "Highly Accurate", desc: "Reliable HTML parsing and robust metric extraction." }
              ].map((why, idx) => (
                <div key={idx} className="text-center flex flex-col items-center bg-transparent border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-md p-6 rounded-2xl transition-all duration-300">
                  <div className="mb-4 bg-gray-50 border border-gray-200 p-3 rounded-xl">{why.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{why.title}</h3>
                  <p className="text-sm text-gray-500 max-w-xs">{why.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10 rounded-full blur-3xl opacity-50"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to Analyze Your Website?</h2>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-lg inline-flex items-center gap-2"
            >
              Analyze Now <ArrowRight className="w-5 h-5" />
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
