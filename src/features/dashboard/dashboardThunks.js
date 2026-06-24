import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastError } from '../../utils/toast';

/**
 * Dashboard data is treated as fresh for this many milliseconds after a
 * successful fetch. Navigation away from the dashboard and back inside this
 * window will not re-issue the network request.
 */
export const DASHBOARD_CACHE_TTL_MS = 2 * 60 * 1000;

const isFresh = (lastFetchedAt) =>
    typeof lastFetchedAt === 'number' &&
    Date.now() - lastFetchedAt < DASHBOARD_CACHE_TTL_MS;

/**
 * Compose a `condition` callback for a cached thunk.
 *
 * Returns `true` to allow the API call, `false` to short-circuit (skip the
 * call). A `force: true` arg bypasses the cache check unconditionally.
 */
const makeCacheCondition = (resource) => (arg, { getState }) => {
    if (arg && arg.force) return true;
    const last = getState()?.dashboard?.lastFetched?.[resource];
    if (isFresh(last)) return false;
    return true;
};

export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/dashboard/stats');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    },
    { condition: makeCacheCondition('stats') }
);

export const fetchRecentDonations = createAsyncThunk(
    'dashboard/fetchRecentDonations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/dashboard/recent-donations');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    },
    { condition: makeCacheCondition('donations') }
);

export const fetchRecentCampaigns = createAsyncThunk(
    'dashboard/fetchRecentCampaigns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/dashboard/recent-campaigns');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    },
    { condition: makeCacheCondition('campaigns') }
);
