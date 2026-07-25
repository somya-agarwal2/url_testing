import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-12 px-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 p-6 bg-cards border border-borderSubtle rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
        <div className="space-y-3">
          <div className="h-6 w-32 bg-borderSubtle rounded"></div>
          <div className="h-4 w-48 bg-backgroundSecondary rounded"></div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <div className="h-16 w-24 bg-borderSubtle rounded-lg"></div>
          <div className="h-16 w-24 bg-borderSubtle rounded-lg"></div>
        </div>
      </div>

      {/* Main Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-cards border border-borderSubtle rounded-2xl p-6 h-36 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <div className="h-4 w-20 bg-borderSubtle rounded"></div>
              <div className="h-8 w-8 bg-backgroundSecondary rounded-lg"></div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="h-8 w-16 bg-borderSubtle rounded"></div>
              <div className="h-3 w-24 bg-backgroundSecondary rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Meta Info Skeleton */}
      <div className="mt-6 bg-cards border border-borderSubtle rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="h-6 w-40 bg-borderSubtle rounded"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-backgroundSecondary rounded"></div>
          <div className="h-12 w-full bg-borderSubtle rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-32 bg-backgroundSecondary rounded"></div>
          <div className="h-12 w-full bg-borderSubtle rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
