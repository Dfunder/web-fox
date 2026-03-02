import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    settings: {},
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Reducer placeholders
    },
});


export default adminSlice.reducer;
