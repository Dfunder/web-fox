export const selectAllCampaigns = (state) => state.campaigns.campaigns;
export const selectCampaignsLoading = (state) => state.campaigns.isLoading;
export const selectCampaignsError = (state) => state.campaigns.error;
export const selectCurrentCampaign = (state) => state.campaigns.currentCampaign;
