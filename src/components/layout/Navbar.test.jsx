import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useRole } from '../../hooks/useRole';
import { useAppSelector } from '../../store/hooks';

// Mock dependencies
vi.mock('../../hooks/useRole', () => ({
  useRole: vi.fn(),
}));

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Navbar', () => {
  it('should show Admin Panel and hide Create Campaign for admins', () => {
    useRole.mockReturnValue({ isAdmin: true, isUser: false });
    useAppSelector.mockImplementation((selector) => {
      // Mock selectCurrentUser and selectAuthLoading
      if (selector.name === 'selectCurrentUser') return { name: 'Admin User', role: 'admin' };
      if (selector.name === 'selectAuthLoading') return false;
      return null;
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Note: Navbar elements might be hidden behind avatar click, 
    // but we can check if they are rendered in the DOM
    expect(screen.queryByText('Admin Panel')).toBeInTheDocument();
    expect(screen.queryByText('Create Campaign')).not.toBeInTheDocument();
  });

  it('should show Create Campaign and hide Admin Panel for regular users', () => {
    useRole.mockReturnValue({ isAdmin: false, isUser: true });
    useAppSelector.mockImplementation((selector) => {
      if (selector.name === 'selectCurrentUser') return { name: 'Regular User', role: 'user' };
      if (selector.name === 'selectAuthLoading') return false;
      return null;
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText('Create Campaign')).toBeInTheDocument();
    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
  });

  it('should hide both for guests', () => {
    useRole.mockReturnValue({ isAdmin: false, isUser: false });
    useAppSelector.mockImplementation((selector) => {
      if (selector.name === 'selectCurrentUser') return null;
      if (selector.name === 'selectAuthLoading') return false;
      return null;
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
    expect(screen.queryByText('Create Campaign')).not.toBeInTheDocument();
  });
});
