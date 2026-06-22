import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DashboardPage from './DashboardPage';

const createStore = (authOverrides = {}) => configureStore({
  reducer: {
    auth: () => ({
      isLoading: false,
      user: null,
      isAuthenticated: true,
      ...authOverrides,
    }),
  },
});

describe('DashboardPage', () => {
  it('renders DashboardSkeleton while auth is loading', () => {
    render(
      <Provider store={createStore({ isLoading: true })}>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('status', { name: 'Loading dashboard' })).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton').length).toBe(4);
  });

  it('renders dashboard widgets when auth is not loading', () => {
    render(
      <Provider store={createStore({ isLoading: false })}>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('status', { name: 'Loading dashboard' })).not.toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});