import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAdminData = createAsyncThunk(
    'admin/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            // Async logic placeholder
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
