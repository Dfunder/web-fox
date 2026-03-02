import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        },
        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { setCredentials, clearCredentials, setAuthLoading, setAuthError } = authSlice.actions;
export default authSlice.reducer;
