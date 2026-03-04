import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import campaignsReducer from '../features/campaigns/campaignsSlice';
import donationsReducer from '../features/donations/donationsSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import adminReducer from '../features/admin/adminSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import errorReducer from './errorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    campaigns: campaignsReducer,
    donations: donationsReducer,
    dashboard: dashboardReducer,
    admin: adminReducer,
    bookmarks: bookmarksReducer,
    error: errorReducer,
});

export default rootReducer;
