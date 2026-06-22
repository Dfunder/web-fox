import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  Target,
  Calendar,
  Activity,
  ArrowRight
} from 'lucide-react';
import { StatCardsGridSkeleton } from './dashboardSkeletonParts';

const DonationStatsWidget = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setStats({
        totalDonated: '$1,250.00',
        campaignsSupported: 12,
        lastDonationDate: 'Oct 24, 2023',
        totalDonationsCount: 18,
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      label: 'Total Donated',
      value: stats?.totalDonated,
      icon: <Wallet className="w-6 h-6 text-emerald-500" />,
      bgColor: 'bg-emerald-100'
    },
    {
      label: 'Campaigns Supported',
      value: stats?.campaignsSupported,
      icon: <Target className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Last Donation Date',
      value: stats?.lastDonationDate,
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Total Donations',
      value: stats?.totalDonationsCount,
      icon: <Activity className="w-6 h-6 text-amber-500" />,
      bgColor: 'bg-amber-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Donation Overview</h2>
        <Link 
          to="/dashboard/donations" 
          className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="p-6">
        {loading ? (
          <StatCardsGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-lg border border-slate-100 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
                  <p className="text-xl font-bold text-slate-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationStatsWidget;
