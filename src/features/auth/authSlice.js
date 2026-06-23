import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, verifyEmail, resendEmailVerification, forgotPassword, fetchCurrentUser, uploadAvatar } from './authThunks';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,       
    fieldErrors: {},   
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
            state.fieldErrors = {};
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            state.fieldErrors = {};
        },
        setAuthLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setAuthError: (state, action) => {
            const payload = action.payload;
            if (payload && typeof payload === 'object') {
                state.error = payload.field ? null : (payload.message ?? null);
                state.fieldErrors = payload.field
                    ? { [payload.field]: payload.message }
                    : {};
            } else {
                state.error = payload ?? null;
                state.fieldErrors = {};
            }
            state.isLoading = false;
        },
        clearAuthError: (state) => {
            state.error = null;
            state.fieldErrors = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                if (payload?.field) {
                    state.error = null;
                    state.fieldErrors = { [payload.field]: payload.message };
                } else {
                    state.error = payload?.message ?? payload ?? null;
                    state.fieldErrors = {};
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
                state.fieldErrors = {};
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                if (payload?.field) {
                    state.error = null;
                    state.fieldErrors = { [payload.field]: payload.message };
                } else {
                    state.error = payload?.message ?? payload ?? null;
                    state.fieldErrors = {};
                }
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Logout failed';
                // Still clear credentials on error to ensure user is logged out locally
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(resendEmailVerification.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(resendEmailVerification.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(resendEmailVerification.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user ?? action.payload;
                state.error = null;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(uploadAvatar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                const payload = action.payload;
                const updatedUser = payload?.user ?? payload;
                const avatarUrl = payload?.avatar ?? payload?.avatarUrl ?? payload?.profile_picture;
                if (updatedUser && typeof updatedUser === 'object' && updatedUser.id) {
                    state.user = updatedUser;
                } else if (avatarUrl && state.user) {
                    state.user = { ...state.user, avatar: avatarUrl };
                }
                state.error = null;
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setCredentials, clearCredentials, setAuthLoading, setAuthError, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
