import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBookmarks = createAsyncThunk(
    'bookmarks/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            // Async logic placeholder
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
