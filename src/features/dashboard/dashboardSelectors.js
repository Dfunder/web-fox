export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectRecentDonations = (state) => state.dashboard.recentDonations;
export const selectRecentCampaigns = (state) => state.dashboard.recentCampaigns;
export const selectDashboardLoading = (state) => state.dashboard.isLoading;
export const selectDashboardError = (state) => state.dashboard.error;

/**
 * Returns the per-resource `{ stats, donations, campaigns }` cache
 * timestamps (ms since epoch) for the dashboard. Each entry is `null` when
 * the cache for that resource has been invalidated.
 */
export const selectDashboardLastFetched = (state) =>
    state.dashboard.lastFetched;
