import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSelectors';

/**
 * ProtectedRoute - A higher-order route component that restricts access to authenticated users
 * Redirects unauthenticated users to /login?redirect=/original-path
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component to render if user is authenticated
 * @returns {React.ReactElement} Either the children or a redirect to login
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  // If user is not authenticated, redirect to login with redirect query param
  if (!isAuthenticated) {
    const redirectPath = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectPath}`} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
