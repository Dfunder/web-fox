import Skeleton from '../common/Skeleton';

const skeletonBlock = {
  backgroundColor: '#cbd5e1',
};

export const ProfileSkeleton = () => (
  <div className="min-h-[220px] bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <Skeleton width="33%" height="1.25rem" className="mb-5" />
    <div className="space-y-4 min-h-[140px]">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 min-h-[1.25rem]">
          <div
            className="shrink-0 animate-pulse rounded"
            style={{ ...skeletonBlock, width: '1rem', height: '1rem' }}
          />
          <Skeleton width="75%" height="1rem" />
        </div>
      ))}
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div
    className="flex items-center min-h-[88px] p-4 bg-slate-100 rounded-lg border border-slate-200"
    data-testid="skeleton"
  >
    <div
      className="shrink-0 mr-4 animate-pulse"
      style={{ ...skeletonBlock, width: '3rem', height: '3rem', borderRadius: '9999px' }}
    />
    <div className="flex-1 min-w-0 space-y-2">
      <Skeleton width="66%" height="1rem" />
      <Skeleton width="50%" height="1.5rem" />
    </div>
  </div>
);

export const StatCardsGridSkeleton = ({ count = 4 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[88px]">
    {Array.from({ length: count }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </div>
);

export const StatsWidgetSkeleton = ({ statCount = 4 }) => (
  <div className="min-h-[280px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="flex items-center justify-between min-h-[72px] p-6 border-b border-slate-100 bg-white">
      <Skeleton width="11rem" height="1.25rem" />
      <Skeleton width="5rem" height="1rem" />
    </div>
    <div className="p-6 bg-white min-h-[200px]">
      <StatCardsGridSkeleton count={statCount} />
    </div>
  </div>
);

export const TableRowSkeleton = ({ columns = 5 }) => (
  <tr className="min-h-[48px]">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton width="75%" height="1rem" />
      </td>
    ))}
  </tr>
);