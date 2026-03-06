import { Navigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

/**
 * AdminRoute - A route wrapper that only allows admin users
 * Redirects non-admin users to /dashboard
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component to render if user is admin
 * @returns {React.ReactElement} Either the children or a redirect
 */
const AdminRoute = ({ children }) => {
  const { isAdmin } = useRole();

  // If user is not an admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is admin, render the protected component
  return children;
};

export default AdminRoute;
