import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDonations = createAsyncThunk(
    'donations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // Async logic placeholder
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
