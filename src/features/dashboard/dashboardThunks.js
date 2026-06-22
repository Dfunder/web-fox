import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastError } from '../../utils/toast';

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
    }
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
    }
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
    }
);
