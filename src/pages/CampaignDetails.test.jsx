import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CampaignDetails from './CampaignDetails';
import { useAppSelector } from '../store/hooks';
import * as permissions from '../utils/permissions';

// Mock dependencies
vi.mock('../store/hooks', () => ({
  useAppSelector: vi.fn(),
}));

// Mock permissions
vi.mock('../utils/permissions', () => ({
  canEditCampaign: vi.fn(),
}));

// Mock useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn(),
  };
});

describe('CampaignDetails', () => {
  it('should show Edit/Delete buttons if user is owner', () => {
    useAppSelector.mockReturnValue({ id: 'owner-1' });
    vi.mocked(permissions.canEditCampaign).mockReturnValue(true);
    
    render(
      <MemoryRouter>
        <CampaignDetails />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Edit Campaign')).toBeInTheDocument();
    expect(screen.getByText('Delete Campaign')).toBeInTheDocument();
  });

  it('should hide Edit/Delete buttons if user is not owner', () => {
    useAppSelector.mockReturnValue({ id: 'other-user' });
    vi.mocked(permissions.canEditCampaign).mockReturnValue(false);
    
    render(
      <MemoryRouter>
        <CampaignDetails />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Edit Campaign')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Campaign')).not.toBeInTheDocument();
  });

  it('should handle null user gracefully', () => {
    useAppSelector.mockReturnValue(null);
    vi.mocked(permissions.canEditCampaign).mockReturnValue(false);
    
    render(
      <MemoryRouter>
        <CampaignDetails />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Edit Campaign')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete Campaign')).not.toBeInTheDocument();
  });
});
