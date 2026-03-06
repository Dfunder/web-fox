import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import campaignsReducer from "../features/campaigns/campaignsSlice";
import donationsReducer from "../features/donations/donationsSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import adminReducer from "../features/admin/adminSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";
import errorReducer from "./errorSlice";

// Only token and user survive a page refresh — nothing else
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user"],
};

const rootReducer = combineReducers({
  //  only auth is persisted
  auth: persistReducer(authPersistConfig, authReducer),
  campaigns: campaignsReducer,
  donations: donationsReducer,
  dashboard: dashboardReducer,
  admin: adminReducer,
  bookmarks: bookmarksReducer,
  error: errorReducer,
});

export default rootReducer;
