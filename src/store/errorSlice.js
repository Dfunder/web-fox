import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  isError: false,
  timestamp: null
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
      state.isError = true;
      state.timestamp = Date.now();
    },
    clearError: (state) => {
      state.error = null;
      state.isError = false;
      state.timestamp = null;
    },
    // For handling network errors specifically
    setNetworkError: (state, action) => {
      state.error = {
        message: action.payload || 'Network error occurred. Please check your connection.',
        type: 'network',
        timestamp: Date.now()
      };
      state.isError = true;
      state.timestamp = Date.now();
    },
    // For handling API errors
    setApiError: (state, action) => {
      const { status, statusText, data, message } = action.payload;
      state.error = {
        message: data?.message || message || `API Error: ${status} ${statusText}`,
        status,
        statusText,
        data,
        type: 'api',
        timestamp: Date.now()
      };
      state.isError = true;
      state.timestamp = Date.now();
    },
    // For handling validation errors
    setValidationError: (state, action) => {
      state.error = {
        message: action.payload.message || 'Validation error occurred',
        errors: action.payload.errors || {},
        type: 'validation',
        timestamp: Date.now()
      };
      state.isError = true;
      state.timestamp = Date.now();
    }
  }
});

export const {
  setError,
  clearError,
  setNetworkError,
  setApiError,
  setValidationError
} = errorSlice.actions;

// Selectors
export const selectError = (state) => state.error.error;
export const selectIsError = (state) => state.error.isError;
export const selectErrorTimestamp = (state) => state.error.timestamp;

// Thunk for handling API errors automatically
export const handleApiError = (error) => (dispatch) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    dispatch(setApiError({
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
      message: error.response.data?.message || error.message
    }));
  } else if (error.request) {
    // The request was made but no response was received
    dispatch(setNetworkError('No response received from server. Please check your connection.'));
  } else {
    // Something happened in setting up the request that triggered an Error
    dispatch(setError(error.message || 'An unexpected error occurred'));
  }
};

export default errorSlice.reducer;
