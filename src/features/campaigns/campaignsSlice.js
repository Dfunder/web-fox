import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {
        // Reducer placeholders
    },
});


export default campaignsSlice.reducer;
