import { configureStore } from '@reduxjs/toolkit';

// A simple placeholder reducer to fulfill the requirements until actual features are added
const rootReducer = (state = {}) => {
  return state;
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== 'production',
});
