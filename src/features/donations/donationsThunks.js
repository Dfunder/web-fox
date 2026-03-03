import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError } from '../../utils/toast';

export const fetchDonations = createAsyncThunk(
    'donations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            toastSuccess('Donations loaded');
        } catch (error) {
            toastError(error);
            return rejectWithValue(error.message);
        }
    }
);
