import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from '../features/campaigns/campaignSlice';

export const store = configureStore({
  reducer: {
    campaigns: campaignReducer,
  },
  devTools: import.meta.env.NODE_ENV !== 'production',
});
