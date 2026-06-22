import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../features/auth/authSelectors';

/**
 * Custom hook to determine user roles and permissions
 * Returns normalized role information based on the current authenticated user
 * 
 * @returns {Object} { isAdmin: boolean, isUser: boolean, role: string|null, user: Object|null }
 */
export const useRole = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => {
    // Normalize role to lowercase for safe comparison
    const role = user?.role?.toLowerCase() || null;

    // Determine if user is admin based on normalized role property
    const isAdmin = role === 'admin';
    
    // Determine if user is a regular user (authenticated but not admin)
    // This covers 'user' role specifically or any other authenticated role that isn't admin
    const isUser = !!user && role === 'user';

    return {
      isAdmin,
      isUser,
      role,
      user,
    };
  }, [user]);
};
