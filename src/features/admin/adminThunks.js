import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError } from '../../utils/toast';

export const fetchAdminData = createAsyncThunk(
    'admin/fetchData',
    async (_, { rejectWithValue }) => {
        try {
            toastSuccess('Admin data loaded');
        } catch (error) {
            toastError(error);
            return rejectWithValue(error.message);
        }
    }
);
