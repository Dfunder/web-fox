import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastSuccess, toastError } from '../../utils/toast';

const parseAuthError = (err) => {
    const data = err.response?.data;
    const code = data?.code || data?.error;
    const serverMessage = data?.message || (typeof data === 'string' ? data : null);

    const codeMap = {
        EMAIL_NOT_VERIFIED: {
            message: 'Please verify your email before signing in. Check your inbox for a verification link.',
        },
        INVALID_CREDENTIALS: {
            message: 'Incorrect email or password. Please try again.',
        },
        EMAIL_TAKEN: {
            message: 'This email is already taken. Try signing in instead.',
            field: 'email',
        },
        USER_NOT_FOUND: {
            message: 'No account found with that email address.',
            field: 'email',
        },
        INVALID_TOKEN: {
            message: 'This link is invalid or has expired. Please request a new one.',
        },
        TOKEN_EXPIRED: {
            message: 'This link has expired. Please request a new one.',
        },
    };

    if (code && codeMap[code]) {
        return codeMap[code];
    }

    // Fall back to whatever message the server sent
    return { message: serverMessage || 'Something went wrong. Please try again.' };
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // const response = await api.post('/auth/register', userData);
            toastSuccess('Registration successful');
            // return response.data;
            return { status: 'success', message: 'Registration successful' };
        } catch (err) {
            const parsed = parseAuthError(err);
            return rejectWithValue(parsed);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            toastSuccess('Logged in successfully');
            return response.data;
        } catch (err) {
            const parsed = parseAuthError(err);
            return rejectWithValue(parsed);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            toastSuccess('Logged out successfully');
            return true;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (token, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/verify-email', { token });
            toastSuccess('Email verified');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const resendEmailVerification = createAsyncThunk(
    'auth/resendEmailVerification',
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/resend-verification', { email });
            toastSuccess('Verification email sent');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            toastSuccess('If this email is registered, a reset link has been sent');
            return response.data;
        } catch (err) {
            // Log for debugging but don't show error toast to user
            console.error('Forgot password background error:', err);
            
          
            toastSuccess('If this email is registered, a reset link has been sent');
            return { status: 'success', message: 'Email processed' };
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users/me');
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    'auth/uploadAvatar',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const response = await api.post('/users/me/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toastSuccess('Profile picture updated');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/reset-password', { token, password });
            toastSuccess('Password reset successfully');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
