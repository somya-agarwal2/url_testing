import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuditCard from '../components/AuditCard';
import ErrorCard from '../components/ErrorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { performAudit } from '../services/api';

const ReportPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlToAnalyze = searchParams.get('url');

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!urlToAnalyze) {
      navigate('/');
      return;
    }

    const runAudit = async () => {
      setLoading(true);
      setError('');
      setResult(null);

      try {
        const data = await performAudit(urlToAnalyze);
        setResult(data);
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    runAudit();
  }, [urlToAnalyze, navigate]);

  return (
    <div className="pb-20 pt-8 px-4 w-full max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-medium"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Home
      </button>

      <div className="min-h-[400px] relative z-10">
        {loading && <LoadingSpinner />}
        {error && <ErrorCard message={error} />}
        {result && !loading && !error && <AuditCard data={result} />}
      </div>
    </div>
  );
};

export default ReportPage;
