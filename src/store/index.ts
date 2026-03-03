import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: (import.meta.env.MODE !== 'production'),
});

// inferred types for use throughout app
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
