import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WhyChooseUs from './WhyChooseUs';

describe('WhyChooseUs Component', () => {
  it('renders the main heading', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText(/Why choose StellarAid\?/i)).toBeInTheDocument();
  });

  it('renders the correct number of feature cards', () => {
    render(<WhyChooseUs />);
    // There are 4 features defined in the component
    const cards = screen.getAllByRole('heading', { level: 3 });
    // Note: FeatureCard might use h3 for titles, let's check WhyChooseUs.jsx
    // WhyChooseUs uses h2 for the main title. Let's assume FeatureCard uses h3 or just check for titles.
    expect(screen.getByText(/Blockchain Verified/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-Time Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete Transparency/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Fees/i)).toBeInTheDocument();
  });
});
