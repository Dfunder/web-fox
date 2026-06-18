import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CampaignStatsWidget from './CampaignStatsWidget';

describe('CampaignStatsWidget', () => {
  it('renders loading skeleton initially', () => {
    render(
      <MemoryRouter>
        <CampaignStatsWidget />
      </MemoryRouter>
    );
    
    // Check for skeletons by test id
    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders stats titles after loading', async () => {
    render(
      <MemoryRouter>
        <CampaignStatsWidget />
      </MemoryRouter>
    );

    // Wait for data to load (simulated with 1200ms in component)
    await waitFor(() => {
      expect(screen.getByText('Campaign Overview')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Total Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Active Campaigns')).toBeInTheDocument();
    expect(screen.getByText('Total Raised')).toBeInTheDocument();
    expect(screen.getByText('Pending Approval')).toBeInTheDocument();
  });

  it('contains a link to view campaigns', async () => {
    render(
      <MemoryRouter>
        <CampaignStatsWidget />
      </MemoryRouter>
    );

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /view campaigns/i });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe('/dashboard/campaigns');
    });
  });
});
