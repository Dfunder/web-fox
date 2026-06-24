import { createSlice } from '@reduxjs/toolkit';
import {
    createCampaign,
    updateCampaign,
    deleteCampaign,
    submitCampaign,
    fetchMyCampaigns,
    fetchCampaignById,
} from './campaignsThunks';

// Visual order of the multi-step "Create Campaign" form.
// Indices are 0-based; the public slice state uses 1-based `formStep`
// (1 == details, 2 == funding, 3 == media, 4 == review) to match the
// issue's spec and the user-facing "Step N" indicator.
export const CAMPAIGN_STEPS = ['details', 'funding', 'media', 'review'];

const emptyDraft = {
    title: '',
    category: '',
    description: '',
    fullStory: '',
    goalAmount: '',
    deadline: '',
    coverImageUrl: '',
};

const initialState = {
    campaigns: [],
    currentCampaign: null,
    draftCampaign: { ...emptyDraft },
    formStep: 1,
    isLoading: false,
    error: null,
};

const findCampaignIndex = (state, id) =>
    state.campaigns.findIndex((c) => c?.id === id);

const replaceCampaign = (state, incoming) => {
    if (!incoming || incoming.id == null) return;
    const idx = findCampaignIndex(state, incoming.id);
    if (idx !== -1) {
        state.campaigns[idx] = incoming;
    } else {
        state.campaigns.push(incoming);
    }
};

const setCurrentIfPresent = (state, incoming) => {
    if (incoming?.id != null) {
        state.currentCampaign = incoming;
    }
};

const campaignsSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {
        setFormStep(state, action) {
            const step = action.payload;
            if (typeof step === 'number' && step >= 1 && step <= CAMPAIGN_STEPS.length) {
                state.formStep = step;
            }
        },
        nextStep(state) {
            if (state.formStep < CAMPAIGN_STEPS.length) {
                state.formStep += 1;
            }
        },
        prevStep(state) {
            if (state.formStep > 1) {
                state.formStep -= 1;
            }
        },
        updateDraft(state, action) {
            state.draftCampaign = { ...state.draftCampaign, ...action.payload };
        },
        clearDraft(state) {
            state.draftCampaign = { ...emptyDraft };
            state.formStep = 1;
        },
        clearCurrentCampaign(state) {
            state.currentCampaign = null;
        },
        clearCampaignsError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // createCampaign
            .addCase(createCampaign.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                replaceCampaign(state, action.payload);
                // The newly created campaign becomes "current" so the next
                // submit/update/delete targets it without extra wiring.
                setCurrentIfPresent(state, action.payload);
            })
            .addCase(createCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to create campaign';
            })
            // updateCampaign
            .addCase(updateCampaign.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                replaceCampaign(state, action.payload);
                // Explicitly promote the updated campaign to "current" so
                // viewers/editors land on it without extra wiring — same as
                // createCampaign.fulfilled.
                setCurrentIfPresent(state, action.payload);
            })
            .addCase(updateCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to update campaign';
            })
            // deleteCampaign
            .addCase(deleteCampaign.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                const removedId = action.payload;
                state.campaigns = state.campaigns.filter((c) => c?.id !== removedId);
                if (state.currentCampaign?.id === removedId) {
                    state.currentCampaign = null;
                }
            })
            .addCase(deleteCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to delete campaign';
            })
            // submitCampaign
            .addCase(submitCampaign.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(submitCampaign.fulfilled, (state, action) => {
                state.isLoading = false;
                replaceCampaign(state, action.payload);
                if (action.payload?.id != null) {
                    state.currentCampaign = action.payload;
                }
                // Submission succeeded — clear the draft so the wizard returns
                // to a clean Step 1 for the next campaign.
                state.draftCampaign = { ...emptyDraft };
                state.formStep = 1;
            })
            .addCase(submitCampaign.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to submit campaign';
            })
            // fetchMyCampaigns
            .addCase(fetchMyCampaigns.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMyCampaigns.fulfilled, (state, action) => {
                state.isLoading = false;
                // The /campaigns/mine endpoint is contractually expected to
                // return a flat array of campaigns. If we receive anything
                // else (e.g. a wrapped object), surface it as an error so the
                // UI doesn't silently render an empty list.
                if (Array.isArray(action.payload)) {
                    state.campaigns = action.payload;
                } else {
                    state.campaigns = [];
                    state.error = 'Unexpected response shape from /campaigns/mine';
                }
            })
            .addCase(fetchMyCampaigns.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to load your campaigns';
            })
            // fetchCampaignById
            .addCase(fetchCampaignById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCampaignById.fulfilled, (state, action) => {
                state.isLoading = false;
                replaceCampaign(state, action.payload);
                setCurrentIfPresent(state, action.payload);
            })
            .addCase(fetchCampaignById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to load campaign';
            });
    },
});

export const {
    setFormStep,
    nextStep,
    prevStep,
    updateDraft,
    clearDraft,
    clearCurrentCampaign,
    clearCampaignsError,
} = campaignsSlice.actions;

export const selectFormStep = (state) => state.campaigns.formStep;
export const selectDraftCampaign = (state) => state.campaigns.draftCampaign;

export default campaignsSlice.reducer;
