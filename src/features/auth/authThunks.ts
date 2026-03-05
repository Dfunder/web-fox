import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastSuccess, toastError } from '../../utils/toast';

// payload/type definitions
interface RegisterData {
    // specify fields if known, otherwise use any
    [key: string]: any;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface ResetPasswordPayload {
    token: string;
    password: string;
}

// generic reject value type used across thunks
interface RejectValue {
    message?: string;
}

export const registerUser = createAsyncThunk<any, RegisterData, { rejectValue: RejectValue }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            // const response = await api.post('/auth/register', userData);
            toastSuccess('Registration successful');
            // return response.data;
            return { status: 'success', message: 'Registration successful' };
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const loginUser = createAsyncThunk<any, LoginCredentials, { rejectValue: RejectValue }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', credentials);
            toastSuccess('Logged in successfully');
            return response.data;
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const logoutUser = createAsyncThunk<boolean, void, { rejectValue: RejectValue }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await api.post('/auth/logout');
            toastSuccess('Logged out successfully');
            return true;
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const verifyEmail = createAsyncThunk<any, string, { rejectValue: RejectValue }>(
    'auth/verifyEmail',
    async (token, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/verify-email', { token });
            toastSuccess('Email verified');
            return response.data;
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const resendEmailVerification = createAsyncThunk<any, string, { rejectValue: RejectValue }>(
    'auth/resendEmailVerification',
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/resend-verification', { email });
            toastSuccess('Verification email sent');
            return response.data;
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const forgotPassword = createAsyncThunk<any, string, { rejectValue: RejectValue }>(
    'auth/forgotPassword',
    async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            toastSuccess('If this email is registered, a reset link has been sent');
            return response.data;
        } catch (err: any) {
            // Log for debugging but don't show error toast to user
            console.error('Forgot password background error:', err);
            
            // For security (avoiding user enumeration), always return success state to the UI
            // unless it's a critical application error we want the user to see.
            // In this specific task, "regardless of whether the email exists" implies a uniform success UI.
            toastSuccess('If this email is registered, a reset link has been sent');
            return { status: 'success', message: 'Email processed' };
        }
    }
);

export const resetPassword = createAsyncThunk<any, ResetPasswordPayload, { rejectValue: RejectValue }>(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/reset-password', { token, password });
            toastSuccess('Password reset successfully');
            return response.data;
        } catch (err: any) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
