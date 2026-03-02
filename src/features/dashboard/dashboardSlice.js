import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stats: {},
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Reducer placeholders
    },
});


export default dashboardSlice.reducer;
