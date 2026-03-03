import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError } from '../../utils/toast';

export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            toastSuccess('Dashboard stats loaded');
        } catch (error) {
            toastError(error);
            return rejectWithValue(error.message);
        }
    }
);
