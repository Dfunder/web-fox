import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toastSuccess, toastError } from '../../utils/toast';

export const createCampaign = createAsyncThunk(
    'campaigns/create',
    async (campaignData, { rejectWithValue }) => {
        try {
            const response = await api.post('/campaigns', campaignData);
            toastSuccess('Campaign created');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to create campaign');
        }
    }
);

export const updateCampaign = createAsyncThunk(
    'campaigns/update',
    async ({ id, ...updates }, { rejectWithValue }) => {
        if (!id) {
            return rejectWithValue('Campaign id is required to update');
        }
        try {
            const response = await api.put(`/campaigns/${id}`, updates);
            toastSuccess('Campaign updated');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to update campaign');
        }
    }
);

export const deleteCampaign = createAsyncThunk(
    'campaigns/delete',
    async (id, { rejectWithValue }) => {
        if (!id) {
            return rejectWithValue('Campaign id is required to delete');
        }
        try {
            await api.delete(`/campaigns/${id}`);
            toastSuccess('Campaign deleted');
            return id;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to delete campaign');
        }
    }
);

export const submitCampaign = createAsyncThunk(
    'campaigns/submit',
    async (campaignInput, { rejectWithValue }) => {
        try {
            // If passed a full draft object (no id), create then submit in one shot.
            if (
                campaignInput &&
                typeof campaignInput === 'object' &&
                campaignInput.id == null
            ) {
                const created = await api.post('/campaigns', campaignInput);
                const response = await api.post(
                    `/campaigns/${created.data.id}/submit`,
                );
                toastSuccess('Campaign submitted');
                return response.data;
            }
            const response = await api.post(`/campaigns/${campaignInput}/submit`);
            toastSuccess('Campaign submitted');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to submit campaign');
        }
    }
);

export const fetchMyCampaigns = createAsyncThunk(
    'campaigns/fetchMyCampaigns',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/campaigns/mine');
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to load your campaigns');
        }
    }
);

export const fetchCampaignById = createAsyncThunk(
    'campaigns/fetchById',
    async (id, { rejectWithValue }) => {
        if (!id) {
            return rejectWithValue('Campaign id is required');
        }
        try {
            const response = await api.get(`/campaigns/${id}`);
            return response.data;
        } catch (err) {
            toastError(err);
            return rejectWithValue(err.response?.data ?? err.message ?? 'Failed to load campaign');
        }
    }
);
