import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastSuccess, toastError } from '../../utils/toast';

export const fetchBookmarks = createAsyncThunk(
    'bookmarks/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            toastSuccess('Bookmarks loaded');
        } catch (error) {
            toastError(error);
            return rejectWithValue(error.message);
        }
    }
);
