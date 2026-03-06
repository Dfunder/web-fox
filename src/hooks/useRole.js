import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../features/auth/authSelectors';

/**
 * Custom hook to determine user roles
 * @returns {Object} { isAdmin: boolean, isUser: boolean }
 */
export const useRole = () => {
  const user = useAppSelector(selectCurrentUser);

  // Determine if user is admin based on role property
  const isAdmin = user?.role === 'admin';
  
  // Determine if user is a regular user (authenticated but not admin)
  const isUser = !!user && user?.role !== 'admin';

  return {
    isAdmin,
    isUser,
  };
};
