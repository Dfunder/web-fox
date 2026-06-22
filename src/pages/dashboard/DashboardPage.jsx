import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DonationStatsWidget from '../../components/dashboard/DonationStatsWidget';
import DashboardSkeleton from '../../components/dashboard/DashboardSkeleton';
import UserProfileCard from '../../components/dashboard/UserProfileCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCurrentUser } from '../../features/auth/authThunks';
import { selectAuthLoading, selectCurrentUser } from '../../features/auth/authSelectors';

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const loading = useAppSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <p className="text-slate-500 mt-1">Manage your account, donations, and campaigns.</p>
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