import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, InboxIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecentDonations } from '../../features/dashboard/dashboardThunks';
import {
  selectRecentDonations,
  selectDashboardLoading,
} from '../../features/dashboard/dashboardSelectors';

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_BADGE = {
  completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-700' },
  pending:   { label: 'Pending',   className: 'bg-amber-100  text-amber-700'  },
  failed:    { label: 'Failed',    className: 'bg-red-100    text-red-700'    },
  refunded:  { label: 'Refunded',  className: 'bg-slate-100  text-slate-600'  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_BADGE[status?.toLowerCase()] ?? {
    label: status ?? 'Unknown',
    className: 'bg-slate-100 text-slate-500',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RecentDonations() {
  const dispatch = useAppDispatch();
  const donations = useAppSelector(selectRecentDonations);
  const loading   = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchRecentDonations());
  }, [dispatch]);

  // Show at most 5 recent entries
  const recent = donations.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Recent Donations</h2>
        <Link
          to="/dashboard/donations"
          className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <th className="px-4 py-3">Campaign</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              // Skeleton rows while fetching
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : recent.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <InboxIcon className="w-10 h-10 text-slate-300" />
                    <p className="text-sm font-medium">No donations yet</p>
                    <p className="text-xs text-slate-400">
                      Your donation history will appear here once you support a campaign.
                    </p>
                    <Link
                      to="/campaigns"
                      className="mt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Browse campaigns →
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              // Donation rows
              recent.map((donation) => {
                const date = donation.createdAt
                  ? new Date(donation.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : '—';

                return (
                  <tr
                    key={donation._id ?? donation.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-800 max-w-[180px] truncate">
                      {donation.campaignName ?? donation.campaign?.title ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                      {donation.amount != null
                        ? Number(donation.amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 6,
                          })
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 uppercase">
                      {donation.asset ?? donation.currency ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={donation.status} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
