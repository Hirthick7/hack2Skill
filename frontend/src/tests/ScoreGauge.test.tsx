import { render, screen } from '@testing-library/react';
import { ScoreGauge } from '../components/charts/ScoreGauge';
import { describe, it, expect } from 'vitest';

describe('ScoreGauge Component', () => {
  it('renders the correct score text', () => {
    render(<ScoreGauge score={85} />);
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('/ 100')).toBeInTheDocument();
  });
});
