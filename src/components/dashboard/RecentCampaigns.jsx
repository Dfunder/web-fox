import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle, LayoutGrid } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRecentCampaigns } from '../../features/dashboard/dashboardThunks';
import {
  selectRecentCampaigns,
  selectDashboardLoading,
} from '../../features/dashboard/dashboardSelectors';

// ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_BADGE = {
  active:    { label: 'Active',    className: 'bg-emerald-100 text-emerald-700' },
  completed: { label: 'Completed', className: 'bg-indigo-100  text-indigo-700'  },
  pending:   { label: 'Pending',   className: 'bg-amber-100   text-amber-700'   },
  rejected:  { label: 'Rejected',  className: 'bg-red-100     text-red-700'     },
  paused:    { label: 'Paused',    className: 'bg-slate-100   text-slate-600'   },
};

function StatusBadge({ status }) {
  const cfg = STATUS_BADGE[status?.toLowerCase()] ?? {
    label: status ?? 'Unknown',
    className: 'bg-slate-100 text-slate-500',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ raised, goal }) {
  const pct = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;
  return (
    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
      <div
        className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ─── Skeleton card ────────────────────────────────────────────────────────────
function CampaignCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 animate-pulse">
      <div className="flex items-start justify-between gap-2">
        <div className="h-4 bg-slate-200 rounded w-3/5" />
        <div className="h-5 bg-slate-200 rounded-full w-16" />
      </div>
      <div className="h-1.5 bg-slate-200 rounded-full w-full" />
      <div className="flex justify-between">
        <div className="h-3 bg-slate-200 rounded w-2/5" />
        <div className="h-3 bg-slate-200 rounded w-1/4" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RecentCampaigns() {
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectRecentCampaigns);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(fetchRecentCampaigns());
  }, [dispatch]);

  const recent = campaigns.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Recent Campaigns</h2>
        <div className="flex items-center gap-3">
          <Link
            to="/campaigns/create"
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Create New Campaign
          </Link>
          <Link
            to="/dashboard/campaigns"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))}
          </div>
        ) : recent.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center gap-3 py-10 text-slate-400">
            <LayoutGrid className="w-12 h-12 text-slate-300" />
            <p className="text-sm font-medium text-slate-600">No campaigns yet</p>
            <p className="text-xs text-slate-400 text-center max-w-xs">
              You have not created any campaigns. Launch your first one and start
              collecting donations.
            </p>
            <Link
              to="/campaigns/create"
              className="mt-2 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Create Your First Campaign
            </Link>
          </div>
        ) : (
          // Campaign cards grid
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recent.map((campaign) => {
              const id = campaign._id ?? campaign.id;
              const raised = Number(campaign.amountRaised ?? campaign.raised ?? 0);
              const goal = Number(campaign.goal ?? campaign.targetAmount ?? 0);
              const date = campaign.createdAt
                ? new Date(campaign.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })
                : '—';

              return (
                <Link
                  key={id}
                  to={`/campaigns/${id}`}
                  className="group block rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors p-4 space-y-3"
                >
                  {/* Title + status */}
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2 leading-snug">
                      {campaign.title ?? campaign.name ?? 'Untitled Campaign'}
                    </p>
                    <StatusBadge status={campaign.status} />
                  </div>

                  {/* Progress bar */}
                  <ProgressBar raised={raised} goal={goal} />

                  {/* Raised / goal + date */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      <span className="font-semibold text-slate-700">
                        {raised.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      {goal > 0 && (
                        <>
                          {' / '}
                          {goal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </>
                      )}
                    </span>
                    <span>{date}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}