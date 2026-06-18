import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import DonationStatsWidget from '../components/dashboard/DonationStatsWidget';
import UserProfileCard from '../components/dashboard/UserProfileCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCurrentUser } from '../features/auth/authThunks';
import { selectCurrentUser } from '../features/auth/authSelectors';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Manage your account, donations, and projects.</p>
      </div>

      {user && !user.walletAddress && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            Complete your profile — add a wallet address to start receiving donations.
          </span>
          <Link
            to="/profile"
            className="ml-auto text-sm font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 flex-shrink-0"
          >
            Go to Profile
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <UserProfileCard />
        </div>
        <div className="lg:col-span-3">
          <DonationStatsWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
