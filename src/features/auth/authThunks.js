import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastSuccess, toastError } from '../../utils/toast';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/register', userData);
            toastSuccess('Registration successful');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
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
            toastError(err);
            return rejectWithValue(err.response?.data || err.message);
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

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            toastSuccess('Reset link sent to email');
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
