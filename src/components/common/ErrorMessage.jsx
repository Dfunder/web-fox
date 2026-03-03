import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/errorSlice';

const ErrorMessage = ({ error, className = '', onDismiss }) => {
  const dispatch = useDispatch();
  const globalError = useSelector(state => state.error);

  // Use provided error prop or fall back to global error state
  const displayError = error || globalError;

  if (!displayError) {
    return null;
  }

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      dispatch(clearError());
    }
  };

  // Determine error message based on error type
  const getErrorMessage = (error) => {
    if (typeof error === 'string') {
      return error;
    }

    if (error?.message) {
      return error.message;
    }

    if (error?.data?.message) {
      return error.data.message;
    }

    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    if (error?.response?.statusText) {
      return `${error.response.status}: ${error.response.statusText}`;
    }

    return 'An unexpected error occurred. Please try again.';
  };

  // Determine error type for styling
  const getErrorType = (error) => {
    if (error?.response?.status >= 500) return 'error';
    if (error?.response?.status >= 400) return 'warning';
    if (error?.name === 'NetworkError' || error?.code === 'NETWORK_ERROR') return 'warning';
    return 'error';
  };

  const errorType = getErrorType(displayError);
  const errorMessage = getErrorMessage(displayError);

  const baseStyles = 'p-4 rounded-lg flex items-start space-x-3 transition-all duration-200';
  const typeStyles = {
    error: 'bg-red-50 border border-red-200 text-red-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800'
  };

  const iconColors = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  return (
    <div className={`${baseStyles} ${typeStyles[errorType]} ${className}`}>
      <div className="flex-shrink-0">
        {errorType === 'error' && (
          <svg
            className={`w-5 h-5 ${iconColors[errorType]}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {errorType === 'warning' && (
          <svg
            className={`w-5 h-5 ${iconColors[errorType]}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {errorType === 'info' && (
          <svg
            className={`w-5 h-5 ${iconColors[errorType]}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">
          {errorMessage}
        </p>
        
        {/* Show additional details in development */}
        {process.env.NODE_ENV === 'development' && displayError?.response && (
          <details className="mt-2 text-xs">
            <summary className="cursor-pointer opacity-75 hover:opacity-100">
              Technical Details
            </summary>
            <div className="mt-1 space-y-1">
              {displayError.response.status && (
                <div>
                  <strong>Status:</strong> {displayError.response.status}
                </div>
              )}
              {displayError.response.statusText && (
                <div>
                  <strong>Status Text:</strong> {displayError.response.statusText}
                </div>
              )}
              {displayError.config?.url && (
                <div>
                  <strong>URL:</strong> {displayError.config.url}
                </div>
              )}
              {displayError.config?.method && (
                <div>
                  <strong>Method:</strong> {displayError.config.method.toUpperCase()}
                </div>
              )}
            </div>
          </details>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className={`flex-shrink-0 p-1 rounded-md hover:bg-opacity-20 hover:bg-current transition-colors duration-200 ${iconColors[errorType]}`}
        aria-label="Dismiss error"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ErrorMessage;
