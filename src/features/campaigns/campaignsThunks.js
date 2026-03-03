import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError } from '../../utils/toast';

export const fetchCampaigns = createAsyncThunk(
    'campaigns/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            toastSuccess('Campaigns loaded');
        } catch (error) {
            toastError(error);
            return rejectWithValue(error.message);
        }
    }
);
