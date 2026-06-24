import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import DonationStatsWidget from '../../components/dashboard/DonationStatsWidget';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';
import UserProfileCard from '../../components/dashboard/UserProfileCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCurrentUser } from '../../features/auth/authThunks';
import { selectAuthLoading, selectCurrentUser } from '../../features/auth/authSelectors';
import {
  fetchDashboardStats,
  fetchRecentDonations,
  fetchRecentCampaigns,
} from '../../features/dashboard/dashboardThunks';
import { selectDashboardLoading } from '../../features/dashboard/dashboardSelectors';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);
  const dashboardLoading = useAppSelector(selectDashboardLoading);

  // Initial / re-mount fetch. Each thunk consults its own cache window, so this
  // is effectively a no-op within 2 minutes of the previous successful fetch.
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchDashboardStats());
    dispatch(fetchRecentDonations());
    dispatch(fetchRecentCampaigns());
  }, [dispatch]);

  // Force a refresh of all dashboard resources, bypassing the 2-minute cache.
  const handleRefresh = () => {
    dispatch(fetchDashboardStats({ force: true }));
    dispatch(fetchRecentDonations({ force: true }));
    dispatch(fetchRecentCampaigns({ force: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
          <p className="text-slate-500 mt-1">
            Manage your account, donations, and campaigns.
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={dashboardLoading}
          aria-label="Refresh dashboard data"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${dashboardLoading ? 'animate-spin text-indigo-600' : 'text-slate-500'}`}
          />
          Refresh
        </button>
      </div>

      {user && !user.walletAddress && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-4 py-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            Complete your profile — add a wallet address to start receiving donations.
          </span>
          <Link
            to="/dashboard/settings"
            className="ml-auto text-sm font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 flex-shrink-0"
          >
            Go to Settings
          </Link>
        </div>
      )}

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <UserProfileCard />
          </div>
          <div className="lg:col-span-3">
            <DonationStatsWidget />
          </div>
        </div>
      )}
    </div>
  );
}
