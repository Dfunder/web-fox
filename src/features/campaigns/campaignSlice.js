import { createSlice } from '@reduxjs/toolkit';

export const CAMPAIGN_STEPS = ['details', 'funding', 'media', 'review'];

const initialState = {
  formStep: 0,
  draftCampaign: {
    title: '',
    category: '',
    description: '',
    goalAmount: '',
    deadline: '',
    coverImageUrl: '',
  },
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setFormStep(state, action) {
      const step = action.payload;
      if (step >= 0 && step < CAMPAIGN_STEPS.length) {
        state.formStep = step;
      }
    },
    nextStep(state) {
      if (state.formStep < CAMPAIGN_STEPS.length - 1) {
        state.formStep += 1;
      }
    },
    prevStep(state) {
      if (state.formStep > 0) {
        state.formStep -= 1;
      }
    },
    updateDraftCampaign(state, action) {
      state.draftCampaign = { ...state.draftCampaign, ...action.payload };
    },
    resetCampaignForm() {
      return initialState;
    },
  },
});

export const {
  setFormStep,
  nextStep,
  prevStep,
  updateDraftCampaign,
  resetCampaignForm,
} = campaignSlice.actions;

export const selectFormStep = (state) => state.campaigns.formStep;
export const selectDraftCampaign = (state) => state.campaigns.draftCampaign;

export default campaignSlice.reducer;
