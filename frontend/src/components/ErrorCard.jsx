import { AlertTriangle, WifiOff, Hourglass, FileWarning, SearchX, ServerCrash, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorCard = ({ message }) => {
  if (!message) return null;

  let Icon = AlertTriangle;
  let colorClass = 'text-error bg-error/10 border-error/20';
  let iconColor = 'text-error';
  let title = 'Audit Failed';
  let description = message;

  if (message.includes('Invalid URL')) {
    Icon = SearchX;
    colorClass = 'text-error bg-error/10 border-error/20';
    iconColor = 'text-error';
    title = 'Invalid URL';
    description = 'Please enter a valid URL including http:// or https://';
  } else if (message.includes('Connection Refused')) {
    Icon = WifiOff;
    colorClass = 'text-error bg-error/10 border-error/20';
    iconColor = 'text-error';
    title = 'Connection Error';
    description = 'Unable to connect to the website. Please check the URL or internet connection.';
  } else if (message.includes('Timed Out') || message.includes('Timeout')) {
    Icon = Hourglass;
    colorClass = 'text-orange-500 bg-orange-500/10 border-orange-500/20';
    iconColor = 'text-orange-500';
    title = 'Request Timed Out';
    description = 'The website took too long to respond.';
  } else if (message.includes('Non HTML Content')) {
    Icon = FileWarning;
    colorClass = 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    iconColor = 'text-blue-400';
    title = 'Non HTML Content';
    description = 'The provided URL does not contain an HTML webpage.';
  } else if (message.includes('404')) {
    Icon = Search;
    colorClass = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    iconColor = 'text-yellow-500';
    title = '404 Not Found';
    description = 'The requested page does not exist.';
  } else if (message.includes('Server Error') || message.includes('500')) {
    Icon = ServerCrash;
    colorClass = 'text-error bg-error/10 border-error/20';
    iconColor = 'text-error';
    title = '500 Server Error';
    description = 'The server encountered an internal error.';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className={`border rounded-2xl p-8 flex flex-col items-center justify-center text-center ${colorClass}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-black/5 mb-4`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-textMain mb-2">{title}</h3>
        <p className="text-textMuted max-w-md">{description}</p>
      </div>
    </motion.div>
  );
};

export default ErrorCard;
