import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history: [],
    loading: false,
    error: null,
};

const donationsSlice = createSlice({
    name: 'donations',
    initialState,
    reducers: {
        // Reducer placeholders
    },
});


export default donationsSlice.reducer;
