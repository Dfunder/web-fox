import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            // Async logic placeholder
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
