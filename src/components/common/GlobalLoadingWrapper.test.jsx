import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import GlobalLoadingWrapper from './GlobalLoadingWrapper';

const createStore = (overrides = {}) => configureStore({
  reducer: {
    auth: () => ({ isLoading: false, ...overrides.auth }),
    campaigns: () => ({ isLoading: false, ...overrides.campaigns }),
    donations: () => ({ loading: false, ...overrides.donations }),
    dashboard: () => ({ isLoading: false, ...overrides.dashboard }),
  },
});

const renderAt = (path, store) => render(
  <Provider store={store}>
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<GlobalLoadingWrapper><div>Page</div></GlobalLoadingWrapper>} />
      </Routes>
    </MemoryRouter>
  </Provider>,
);

describe('GlobalLoadingWrapper', () => {
  it('does not show overlay for auth loading on dashboard routes', () => {
    const store = createStore({ auth: { isLoading: true } });
    renderAt('/dashboard', store);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows overlay for auth loading outside dashboard routes', () => {
    const store = createStore({ auth: { isLoading: true } });
    renderAt('/campaigns', store);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});