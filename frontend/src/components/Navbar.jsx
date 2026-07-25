import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-gray-200 p-1.5 rounded-lg shadow-sm flex items-center justify-center">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="text-gray-900 text-xl font-extrabold tracking-tight">Page Pulse</span>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-500 hover:text-gray-900 text-base font-semibold transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-500 hover:text-gray-900 text-base font-semibold transition-colors">How it Works</a>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            <a href="https://github.com/somya-agarwal2/url_testing" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 text-base font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm hover:shadow flex items-center justify-center">
              Analyze Website
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
