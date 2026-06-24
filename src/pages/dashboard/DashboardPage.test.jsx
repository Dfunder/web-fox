import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import DashboardPage from './DashboardPage';

const initialDashboardState = {
  stats: null,
  recentDonations: [],
  recentCampaigns: [],
  isLoading: false,
  error: null,
  lastFetched: { stats: null, donations: null, campaigns: null },
};

// The DashboardPage's slice isn't wired up in this minimal store; returning
// the default state keeps the placeholder reducer behavior compatible with
// production with no need for a full mock of the thunk machinery.
const dashboardStubReducer = () => initialDashboardState;

const createStore = (authOverrides = {}) => configureStore({
  reducer: {
    auth: () => ({
      isLoading: false,
      user: null,
      isAuthenticated: true,
      ...authOverrides,
    }),
    dashboard: dashboardStubReducer,
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
