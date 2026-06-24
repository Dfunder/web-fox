import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer, {
  clearDashboard,
  invalidateDashboardCache,
} from './dashboardSlice';
import authReducer from '../auth/authSlice';
import {
  fetchDashboardStats,
  fetchRecentDonations,
  fetchRecentCampaigns,
  DASHBOARD_CACHE_TTL_MS,
} from './dashboardThunks';

// Mock the axios-based api instance: every test records calls on a shared mock.
vi.mock('../../services/api', () => {
    const api = {
        get: vi.fn(),
        post: vi.fn(),
    };
    return { default: api };
});

// Silence toast calls during tests — we're asserting on network behavior,
// not on toast appearance.
vi.mock('../../utils/toast', () => ({
    toastError: vi.fn(),
    toastSuccess: vi.fn(),
    toastInfo: vi.fn(),
    toastLoading: vi.fn(),
}));

import api from '../../services/api';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

const makeStore = () =>
    configureStore({
        reducer: {
            dashboard: dashboardReducer,
            auth: authReducer,
        },
    });

beforeEach(() => {
    // Each request resolves with a distinct, traceable payload so we can
    // assert on call counts and the resulting state shape.
    api.get.mockReset();
    api.get.mockImplementation((url) => {
        const body = url.split('/').pop();
        return Promise.resolve({ data: { marker: `${body}-payload` } });
    });
});

afterEach(() => {
    vi.useRealTimers();
});

describe('dashboard thunks — caching behavior', () => {
    it('issues a network request on the first dispatch of each resource', async () => {
        const store = makeStore();
        await store.dispatch(fetchDashboardStats());
        await store.dispatch(fetchRecentDonations());
        await store.dispatch(fetchRecentCampaigns());
        await flushPromises();

        expect(api.get).toHaveBeenCalledTimes(3);
        expect(api.get).toHaveBeenCalledWith('/dashboard/stats');
        expect(api.get).toHaveBeenCalledWith('/dashboard/recent-donations');
        expect(api.get).toHaveBeenCalledWith('/dashboard/recent-campaigns');
    });

    it('skips the network call for a resource that was fetched within the TTL', async () => {
        const store = makeStore();
        await store.dispatch(fetchRecentDonations());
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(1);

        // Dispatch again immediately — cache is still fresh, no extra call.
        await store.dispatch(fetchRecentDonations());
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(1);
    });

    it('does not share cache across different resources', async () => {
        const store = makeStore();
        await store.dispatch(fetchDashboardStats());
        await flushPromises();
        await store.dispatch(fetchRecentDonations());
        await flushPromises();

        expect(api.get).toHaveBeenCalledTimes(2);
    });

    it('refetches when the cache timestamp is older than the TTL', async () => {
        const store = makeStore();

        // First fetch — clock starts now.
        await store.dispatch(fetchRecentDonations());
        await flushPromises();

        // Advance the clock past the TTL.
        const originalNow = Date.now;
        Date.now = vi.fn(() => originalNow() + DASHBOARD_CACHE_TTL_MS + 1);

        await store.dispatch(fetchRecentDonations());
        await flushPromises();

        expect(api.get).toHaveBeenCalledTimes(2);

        Date.now = originalNow;
    });

    it('bypasses the cache when { force: true } is passed', async () => {
        const store = makeStore();
        await store.dispatch(fetchRecentDonations());
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(1);

        await store.dispatch(fetchRecentDonations({ force: true }));
        await flushPromises();
        await store.dispatch(fetchRecentCampaigns({ force: true }));
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(3);
    });

    it('records lastFetched timestamps only on fulfilled', async () => {
        const store = makeStore();
        await store.dispatch(fetchRecentDonations());
        await flushPromises();

        const last = store.getState().dashboard.lastFetched;
        expect(last.donations).toBeTypeOf('number');
        expect(last.stats).toBeNull();
        expect(last.campaigns).toBeNull();
    });
});

describe('invalidateDashboardCache action', () => {
    it('clears a single named resource without affecting others', async () => {
        const store = makeStore();
        await store.dispatch(fetchDashboardStats());
        await store.dispatch(fetchRecentDonations());
        await store.dispatch(fetchRecentCampaigns());
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(3);

        store.dispatch(invalidateDashboardCache('donations'));

        const last = store.getState().dashboard.lastFetched;
        expect(last.donations).toBeNull();
        expect(last.stats).toBeTypeOf('number');
        expect(last.campaigns).toBeTypeOf('number');

        // Donations should re-fetch on next dispatch; others should stay cached.
        await store.dispatch(fetchRecentDonations());
        await store.dispatch(fetchDashboardStats());
        await store.dispatch(fetchRecentCampaigns());
        await flushPromises();
        expect(api.get).toHaveBeenCalledTimes(4);
    });

    it('clears every timestamp when called with no payload', async () => {
        const store = makeStore();
        await store.dispatch(fetchDashboardStats());
        await store.dispatch(fetchRecentDonations());
        await store.dispatch(fetchRecentCampaigns());
        await flushPromises();

        store.dispatch(invalidateDashboardCache());

        const last = store.getState().dashboard.lastFetched;
        expect(last).toEqual({ stats: null, donations: null, campaigns: null });
    });
});

describe('clearDashboard action', () => {
    it('resets dashboard state including cache timestamps', async () => {
        const store = makeStore();
        await store.dispatch(fetchRecentDonations());
        await flushPromises();

        store.dispatch(clearDashboard());

        expect(store.getState().dashboard).toMatchObject({
            stats: null,
            recentDonations: [],
            recentCampaigns: [],
            isLoading: false,
            error: null,
            lastFetched: { stats: null, donations: null, campaigns: null },
        });
    });
});
