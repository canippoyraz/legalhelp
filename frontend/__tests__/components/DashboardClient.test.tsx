import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardClient from '@/components/dashboard/DashboardClient';
import type { HistoryItem } from '@/types/agreement';

function makeItem(overrides: Partial<HistoryItem> = {}): HistoryItem {
  return {
    id: crypto.randomUUID(),
    type: 'nda',
    state: 'CA',
    parties: 'Acme Corp & Beta Inc',
    text: 'Agreement text here',
    createdAt: '2026-01-15T10:00:00.000Z',
    ...overrides,
  };
}

function seedStorage(items: HistoryItem[]) {
  localStorage.setItem('lh_agreements', JSON.stringify(items));
}

describe('DashboardClient — empty state', () => {
  it('renders "No agreements yet" when localStorage is empty', () => {
    render(<DashboardClient />);
    expect(screen.getByText(/No agreements yet/i)).toBeInTheDocument();
  });

  it('renders Create your first agreement link', () => {
    render(<DashboardClient />);
    expect(screen.getByRole('link', { name: /Create your first agreement/i })).toBeInTheDocument();
  });

  it('shows 0 for Total Agreements stat', () => {
    render(<DashboardClient />);
    const statValues = document.querySelectorAll('.stat-card__value');
    expect(statValues[0].textContent).toBe('0');
  });

  it('shows — for Most Used Type when no history', () => {
    render(<DashboardClient />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('handles corrupted localStorage without crashing', () => {
    localStorage.setItem('lh_agreements', 'not-valid-json{{{');
    expect(() => render(<DashboardClient />)).not.toThrow();
    expect(screen.getByText(/No agreements yet/i)).toBeInTheDocument();
  });

  it('handles non-array localStorage value without crashing', () => {
    localStorage.setItem('lh_agreements', '"a string"');
    expect(() => render(<DashboardClient />)).not.toThrow();
    expect(screen.getByText(/No agreements yet/i)).toBeInTheDocument();
  });
});

describe('DashboardClient — populated state', () => {
  beforeEach(() => {
    seedStorage([
      makeItem({ type: 'nda', state: 'CA', parties: 'Acme Corp & Beta Inc', createdAt: '2026-01-15T10:00:00.000Z' }),
      makeItem({ type: 'employment', state: 'TX', parties: 'Big Corp & Jane Doe', createdAt: '2026-01-20T10:00:00.000Z' }),
      makeItem({ type: 'nda', state: 'NY', parties: 'Alpha LLC & Zeta Ltd', createdAt: '2026-02-01T10:00:00.000Z' }),
    ]);
  });

  it('shows the agreement table when there are items', () => {
    render(<DashboardClient />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders a row for each agreement', () => {
    render(<DashboardClient />);
    const rows = document.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(3);
  });

  it('shows total count in stat card', () => {
    render(<DashboardClient />);
    const statValues = document.querySelectorAll('.stat-card__value');
    expect(statValues[0].textContent).toBe('3');
  });

  it('shows states covered count', () => {
    render(<DashboardClient />);
    const statValues = document.querySelectorAll('.stat-card__value');
    // CA, TX, NY = 3 unique states
    expect(statValues[3].textContent).toBe('3');
  });

  it('shows NDA as the most used type (2 out of 3)', () => {
    render(<DashboardClient />);
    const statValues = document.querySelectorAll('.stat-card__value');
    expect(statValues[2].textContent).toBe('NDA');
  });

  it('displays parties in the table rows', () => {
    render(<DashboardClient />);
    expect(screen.getByText('Acme Corp & Beta Inc')).toBeInTheDocument();
    expect(screen.getByText('Big Corp & Jane Doe')).toBeInTheDocument();
  });

  it('renders NDA badge for NDA type', () => {
    render(<DashboardClient />);
    const badges = screen.getAllByText('NDA');
    expect(badges.length).toBeGreaterThan(0);
  });

  it('renders state pills for each agreement', () => {
    render(<DashboardClient />);
    const pills = document.querySelectorAll('.state-pill');
    const pillTexts = [...pills].map(p => p.textContent);
    expect(pillTexts).toContain('CA');
    expect(pillTexts).toContain('TX');
    expect(pillTexts).toContain('NY');
  });

  it('shows formatted dates', () => {
    render(<DashboardClient />);
    expect(screen.getByText(/Jan 15, 2026/i)).toBeInTheDocument();
  });

  it('shows — for invalid date strings', () => {
    seedStorage([makeItem({ createdAt: 'not-a-date' })]);
    render(<DashboardClient />);
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });
});

describe('DashboardClient — type filter', () => {
  beforeEach(() => {
    seedStorage([
      makeItem({ type: 'nda', state: 'CA', parties: 'NDA Party A & B' }),
      makeItem({ type: 'employment', state: 'TX', parties: 'Employer & Employee' }),
      makeItem({ type: 'lease', state: 'FL', parties: 'Landlord & Tenant' }),
    ]);
  });

  it('shows all rows when no filter is applied', () => {
    render(<DashboardClient />);
    expect(document.querySelectorAll('tbody tr')).toHaveLength(3);
  });

  it('filters to NDA only', () => {
    render(<DashboardClient />);
    const typeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(typeSelect, { target: { value: 'nda' } });
    expect(document.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(screen.getByText('NDA Party A & B')).toBeInTheDocument();
  });

  it('filters to employment only', () => {
    render(<DashboardClient />);
    const typeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(typeSelect, { target: { value: 'employment' } });
    expect(document.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(screen.getByText('Employer & Employee')).toBeInTheDocument();
  });

  it('shows empty state when filter matches nothing', () => {
    render(<DashboardClient />);
    const typeSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(typeSelect, { target: { value: 'freelance' } });
    expect(screen.getByText(/No agreements yet/i)).toBeInTheDocument();
  });
});

describe('DashboardClient — state filter', () => {
  beforeEach(() => {
    seedStorage([
      makeItem({ type: 'nda', state: 'CA', parties: 'CA Party A & B' }),
      makeItem({ type: 'employment', state: 'TX', parties: 'TX Corp & Employee' }),
    ]);
  });

  it('populates the state filter with unique states', () => {
    render(<DashboardClient />);
    const stateSelect = screen.getAllByRole('combobox')[1];
    const options = stateSelect.querySelectorAll('option');
    // placeholder + CA + TX
    expect(options).toHaveLength(3);
  });

  it('filters by state', () => {
    render(<DashboardClient />);
    const stateSelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(stateSelect, { target: { value: 'CA' } });
    expect(document.querySelectorAll('tbody tr')).toHaveLength(1);
    expect(screen.getByText('CA Party A & B')).toBeInTheDocument();
  });
});

describe('DashboardClient — modal', () => {
  const sampleItem = makeItem({
    type: 'nda',
    state: 'CA',
    parties: 'Modal Party A & B',
    text: 'Full agreement text goes here',
  });

  beforeEach(() => {
    seedStorage([sampleItem]);
  });

  it('opens the modal when "View →" is clicked', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => {
      expect(screen.getByText('Full agreement text goes here')).toBeInTheDocument();
    });
  });

  it('shows type and state in the modal header', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => {
      expect(screen.getByText(/NDA — CA/i)).toBeInTheDocument();
    });
  });

  it('closes the modal when × is clicked', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => screen.getByRole('button', { name: /×/i }));
    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    await waitFor(() => {
      expect(screen.queryByText('Full agreement text goes here')).not.toBeInTheDocument();
    });
  });

  it('closes the modal when clicking the overlay', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => document.querySelector('.modal-overlay'));
    fireEvent.click(document.querySelector('.modal-overlay')!);
    await waitFor(() => {
      expect(screen.queryByText('Full agreement text goes here')).not.toBeInTheDocument();
    });
  });

  it('calls clipboard.writeText when Copy is clicked', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => screen.getByRole('button', { name: /Copy/i }));
    fireEvent.click(screen.getByRole('button', { name: /Copy/i }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Full agreement text goes here');
    });
  });

  it('shows toast after copy', async () => {
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /View →/i }));
    await waitFor(() => screen.getByRole('button', { name: /Copy/i }));
    fireEvent.click(screen.getByRole('button', { name: /Copy/i }));
    await waitFor(() => {
      expect(screen.getByText('Copied to clipboard!')).toBeInTheDocument();
    });
  });
});

describe('DashboardClient — clear history', () => {
  it('removes all agreements after confirming clear history', async () => {
    seedStorage([makeItem(), makeItem()]);
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<DashboardClient />);
    expect(document.querySelectorAll('tbody tr')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: /Clear History/i }));
    await waitFor(() => {
      expect(screen.getByText(/No agreements yet/i)).toBeInTheDocument();
    });
    expect(localStorage.getItem('lh_agreements')).toBeNull();
  });

  it('does not clear if user cancels the confirm dialog', async () => {
    seedStorage([makeItem()]);
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<DashboardClient />);
    fireEvent.click(screen.getByRole('button', { name: /Clear History/i }));
    expect(document.querySelectorAll('tbody tr')).toHaveLength(1);
  });
});
