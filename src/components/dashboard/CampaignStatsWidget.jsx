import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Zap,
  CircleDollarSign,
  Clock,
  ArrowRight
} from 'lucide-react';

/**
 * AnimatedCounter component to animate number totals
 */
const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (value === null || value === undefined) return;
    
    // Check if it's a currency string (e.g., "$1,250.00")
    const isCurrency = typeof value === 'string' && value.includes('$');
    
    // Extract numerical value for animation
    const target = typeof value === 'string' 
      ? parseFloat(value.replace(/[^0-9.-]+/g, "")) 
      : value;
    
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value based on progress
      const current = Math.floor(progress * target);
      
      if (isCurrency) {
        setCount(`$${current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      } else {
        setCount(current.toLocaleString());
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final value is exactly what was passed (including formatting)
        setCount(value);
      }
    };
    
    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
};

const CampaignStatsWidget = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate fetching data to match DonationStatsWidget pattern
    const timer = setTimeout(() => {
      setStats({
        totalCampaigns: 8,
        activeCampaigns: 5,
        totalRaised: '$45,700.00',
        pendingApproval: 2,
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      label: 'Total Campaigns',
      value: stats?.totalCampaigns,
      icon: <Layers className="w-6 h-6 text-indigo-500" />,
      bgColor: 'bg-indigo-100'
    },
    {
      label: 'Active Campaigns',
      value: stats?.activeCampaigns,
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Total Raised',
      value: stats?.totalRaised,
      icon: <CircleDollarSign className="w-6 h-6 text-amber-500" />,
      bgColor: 'bg-amber-100'
    },
    {
      label: 'Pending Approval',
      value: stats?.pendingApproval,
      icon: <Clock className="w-6 h-6 text-slate-500" />,
      bgColor: 'bg-slate-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Campaign Overview</h2>
        <Link 
          to="/dashboard/campaigns" 
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View Campaigns
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center p-4 bg-slate-50 rounded-lg border border-slate-100 animate-pulse" data-testid="skeleton">
                <div className="w-12 h-12 bg-slate-200 rounded-full flex-shrink-0 mr-4"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            // Actual Stats
            statItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg border border-slate-100 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-slate-800">
                    <AnimatedCounter value={item.value} />
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignStatsWidget;
