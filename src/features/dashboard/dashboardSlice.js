import { createSlice } from '@reduxjs/toolkit';
import {
    fetchDashboardStats,
    fetchRecentDonations,
    fetchRecentCampaigns,
} from './dashboardThunks';
import { logoutUser } from '../auth/authThunks';

const initialState = {
    stats: null,
    recentDonations: [],
    recentCampaigns: [],
    isLoading: false,
    error: null,
    /**
     * Per-resource cache timestamps (ms since epoch).
     * Used by the dashboard thunks to decide whether to skip the API call.
     * A `null` value means the cache for that resource is invalid and a
     * request should be issued on the next dispatch.
     */
    lastFetched: {
        stats: null,
        donations: null,
        campaigns: null,
    },
};

/**
 * Invalidate one or every dashboard cache timestamp.
 *
 * Pass a named resource ('stats' | 'donations' | 'campaigns') to invalidate
 * just that entry, or pass `undefined` / `null` / `'all'` to invalidate all.
 */
function applyInvalidation(state, payload) {
    const reset = { stats: null, donations: null, campaigns: null };
    if (!payload || payload === 'all') {
        state.lastFetched = { ...reset };
        return;
    }
    if (payload in reset) {
        state.lastFetched[payload] = null;
    }
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        clearDashboard: () => initialState,
        invalidateDashboardCache: (state, action) => {
            applyInvalidation(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchDashboardStats
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload;
                state.lastFetched.stats = Date.now();
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // fetchRecentDonations
            .addCase(fetchRecentDonations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecentDonations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recentDonations = action.payload;
                state.lastFetched.donations = Date.now();
            })
            .addCase(fetchRecentDonations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // fetchRecentCampaigns
            .addCase(fetchRecentCampaigns.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecentCampaigns.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recentCampaigns = action.payload;
                state.lastFetched.campaigns = Date.now();
            })
            .addCase(fetchRecentCampaigns.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Logout clears the cache so the next user sees fresh data.
            .addCase(logoutUser.fulfilled, () => initialState);
    },
});

export const { clearDashboard, invalidateDashboardCache } = dashboardSlice.actions;
export default dashboardSlice.reducer;
