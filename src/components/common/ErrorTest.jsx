import React from 'react';
import ErrorMessage from './ErrorMessage';

const ErrorTest = () => {
  const [shouldThrow, setShouldThrow] = React.useState(false);
  const [apiError, setApiError] = React.useState(null);

  const triggerError = () => {
    setShouldThrow(true);
  };

  const triggerApiError = () => {
    setApiError({
      message: 'Failed to fetch data from server',
      response: {
        status: 500,
        statusText: 'Internal Server Error'
      }
    });
  };

  const clearApiError = () => {
    setApiError(null);
  };

  if (shouldThrow) {
    throw new Error('This is a test error to verify the ErrorBoundary works!');
  }

  return (
    <div className="p-8 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Error Boundary Test</h2>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Test Error Boundary</h3>
        <p className="text-gray-600 mb-4">
          Click this button to trigger a React error that should be caught by the ErrorBoundary:
        </p>
        <button
          onClick={triggerError}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
        >
          Trigger React Error
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Test Error Message Component</h3>
        <p className="text-gray-600 mb-4">
          Click this button to trigger an API error that should display inline:
        </p>
        <button
          onClick={triggerApiError}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 mr-4"
        >
          Trigger API Error
        </button>
        {apiError && (
          <button
            onClick={clearApiError}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Clear API Error
          </button>
        )}
        
        {apiError && (
          <div className="mt-4">
            <ErrorMessage error={apiError} />
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Testing Instructions:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>React Error:</strong> Should show the ErrorBoundary fallback UI with reload button</li>
          <li>• <strong>API Error:</strong> Should show an inline error message with dismiss option</li>
          <li>• Check browser console for error details in development mode</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorTest;
