import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders with explicit dimensions and background', () => {
    const { container } = render(<Skeleton width="120px" height="16px" />);
    const bar = container.firstChild;

    expect(bar).toHaveStyle({
      width: '120px',
      height: '16px',
      backgroundColor: 'rgb(203, 213, 225)',
      display: 'block',
    });
  });
});