// App.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the game title', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { name: /flappy bird/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
