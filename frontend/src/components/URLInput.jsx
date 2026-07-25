import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

const URLInput = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onAnalyze(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto relative group mt-2">
      <div className="relative flex items-center bg-white border border-gray-200 focus-within:border-primary/50 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-textMuted rounded-2xl p-1.5 transition-all duration-300 shadow-sm">
        <div className="pl-4 pr-2 flex items-center text-gray-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          required
          disabled={isLoading}
          className="flex-1 bg-transparent border-none outline-none text-gray-900 px-2 py-3 placeholder:text-gray-500/60 font-medium disabled:opacity-50 text-base sm:text-lg"
          aria-label="Website URL"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="flex items-center gap-2 bg-primary hover:bg-primaryHover focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none disabled:opacity-50 text-white px-6 py-3 rounded-lg font-medium transition-all active:scale-95 shadow-md hover:shadow-lg ml-2"
          aria-label={isLoading ? 'Analyzing website' : 'Analyze website'}
        >
          {isLoading ? (
            <>
              <span className="hidden sm:inline">Analyzing...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Analyze</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default URLInput;
