import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardSkeleton from './DashboardSkeleton';

describe('DashboardSkeleton', () => {
  it('renders profile and stat card skeleton placeholders', () => {
    render(<DashboardSkeleton />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(4);
  });
});