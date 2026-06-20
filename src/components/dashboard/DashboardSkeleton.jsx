import {
  ProfileSkeleton,
  StatsWidgetSkeleton,
} from './dashboardSkeletonParts';

const DashboardSkeleton = () => {
  return (
    <div role="status" aria-label="Loading dashboard" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ProfileSkeleton />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <StatsWidgetSkeleton />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;