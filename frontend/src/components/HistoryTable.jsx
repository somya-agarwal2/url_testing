import { useEffect, useState } from 'react';
import { getHistory } from '../services/api';
import { Clock, Globe, ArrowUpRight } from 'lucide-react';

const HistoryTable = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <div className="text-center text-slate-500 py-8">Loading history...</div>;
  }

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-semibold text-white">Recent Audits</h2>
      </div>
      <div className="bg-cards border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 text-sm">
                <th className="px-6 py-4 font-medium">URL</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Response Time</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {history.map((record) => (
                <tr key={record.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-200 truncate max-w-[200px] md:max-w-md block">{record.url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${record.status === 200 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                      {record.status || 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {record.response_time ? `${record.response_time}ms` : '-'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
