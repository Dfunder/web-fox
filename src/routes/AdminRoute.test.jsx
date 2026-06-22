import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import { useRole } from '../hooks/useRole';
import { useSelector } from 'react-redux';

// Mock dependencies
vi.mock('../hooks/useRole', () => ({
  useRole: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

vi.mock('../components/common/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('AdminRoute', () => {
  const ProtectedComponent = () => <div>Admin Content</div>;

  it('should show loading spinner when auth is loading', () => {
    useRole.mockReturnValue({ isAdmin: false });
    useSelector.mockReturnValue(true); // isLoading = true

    render(
      <MemoryRouter>
        <AdminRoute>
          <ProtectedComponent />
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render children when user is admin', () => {
    useRole.mockReturnValue({ isAdmin: true });
    useSelector.mockReturnValue(false); // isLoading = false

    render(
      <MemoryRouter>
        <AdminRoute>
          <ProtectedComponent />
        </AdminRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('should redirect to dashboard when user is not admin', () => {
    useRole.mockReturnValue({ isAdmin: false });
    useSelector.mockReturnValue(false); // isLoading = false

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/admin" element={
            <AdminRoute>
              <ProtectedComponent />
            </AdminRoute>
          } />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });
});
