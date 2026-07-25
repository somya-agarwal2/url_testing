import { Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 mt-32 py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-500" />
            <span className="text-gray-500 font-medium">Page Pulse</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</a>
            <a href="https://github.com/somya-agarwal2/url_testing" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">GitHub</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Page Pulse. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            Made with <span className="text-red-500 text-sm">❤️</span> using Flask + React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
