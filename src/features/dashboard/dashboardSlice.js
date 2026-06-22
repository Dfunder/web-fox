import { createSlice } from '@reduxjs/toolkit';
import {
    fetchDashboardStats,
    fetchRecentDonations,
    fetchRecentCampaigns,
} from './dashboardThunks';

const initialState = {
    stats: null,
    recentDonations: [],
    recentCampaigns: [],
    isLoading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        clearDashboard: () => initialState,
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
            })
            .addCase(fetchRecentCampaigns.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
