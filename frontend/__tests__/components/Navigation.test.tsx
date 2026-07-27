import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Navigation from '@/components/Navigation';

describe('Navigation — auth state', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows Sign In / Sign Up links when logged out', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 401 })));

    render(<Navigation />);

    // Both the desktop and mobile nav render at once (mobile is CSS-hidden, not unmounted).
    await waitFor(() => expect(screen.getAllByRole('link', { name: 'Sign In' }).length).toBeGreaterThan(0));
    expect(screen.getAllByRole('link', { name: 'Sign Up' }).length).toBeGreaterThan(0);
  });

  it('shows the signed-in email instead of Sign In / Sign Up when logged in', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ email: 'me@example.com' }), { status: 200 })),
    );

    render(<Navigation />);

    await waitFor(() => expect(screen.getAllByRole('link', { name: 'me@example.com' }).length).toBeGreaterThan(0));
    expect(screen.queryByRole('link', { name: 'Sign In' })).not.toBeInTheDocument();
  });
});
