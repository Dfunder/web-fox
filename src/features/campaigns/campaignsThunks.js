import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCampaigns = createAsyncThunk(
    'campaigns/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // Async logic placeholder
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
