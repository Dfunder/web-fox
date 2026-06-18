import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRole } from '../hooks/useRole';
import { selectAuthLoading } from '../features/auth/authSelectors';
import Spinner from '../components/common/Spinner';

/**
 * AdminRoute - A route wrapper that only allows admin users
 * Redirects non-admin users to /dashboard
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The component to render if user is admin
 * @returns {React.ReactElement} Either the children, a loading spinner, or a redirect
 */
const AdminRoute = ({ children }) => {
  const { isAdmin } = useRole();
  const isLoading = useSelector(selectAuthLoading);

  // While checking authentication/role, show a loader to prevent flicker
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" className="text-accent" />
      </div>
    );
  }

  // If user is not an admin, redirect to dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is admin, render the protected component
  return children;
};

export default AdminRoute;
