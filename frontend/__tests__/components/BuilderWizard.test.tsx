import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BuilderWizard from '@/components/builder/BuilderWizard';

describe('BuilderWizard — step navigation', () => {
  it('renders Step 1 (type selection) on initial load', () => {
    render(<BuilderWizard />);
    expect(screen.getByText('Choose Agreement Type')).toBeInTheDocument();
  });

  it('shows steps indicator with step 1 active', () => {
    render(<BuilderWizard />);
    const dot1 = document.querySelector('.step-dot.active');
    expect(dot1).toBeInTheDocument();
    expect(dot1?.querySelector('span')?.textContent).toBe('1');
  });

  it('advances to Step 2 after selecting type + state and clicking Next', async () => {
    render(<BuilderWizard />);
    fireEvent.click(screen.getByText('Mutual NDA'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    await waitFor(() => {
      expect(screen.getByText('Mutual Non-Disclosure Agreement Details')).toBeInTheDocument();
    });
  });

  it('goes back to Step 1 from Step 2 when Back is clicked', async () => {
    render(<BuilderWizard />);
    fireEvent.click(screen.getByText('Mutual NDA'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    await waitFor(() => screen.getByRole('button', { name: /Back/i }));
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    await waitFor(() => {
      expect(screen.getByText('Choose Agreement Type')).toBeInTheDocument();
    });
  });

  it('shows step 1 type card as selected after going back', async () => {
    render(<BuilderWizard />);
    fireEvent.click(screen.getByText('Mutual NDA'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    await waitFor(() => screen.getByRole('button', { name: /Back/i }));
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    await waitFor(() => {
      const ndaCard = screen.getByText('Mutual NDA').closest('button');
      expect(ndaCard).toHaveClass('selected');
    });
  });
});

describe('BuilderWizard — generating an agreement', () => {
  async function fillAndSubmitNda() {
    const user = userEvent.setup();
    render(<BuilderWizard />);

    // Step 1
    fireEvent.click(screen.getByText('Mutual NDA'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));

    // Step 2
    await waitFor(() => screen.getByLabelText(/First Party/i));
    await user.type(screen.getByLabelText(/First Party/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/Second Party/i), 'Beta Inc');
    await user.type(screen.getByLabelText(/Purpose/i), 'Partnership evaluation');
    await user.type(screen.getByLabelText(/Confidentiality Period/i), '2');
    fireEvent.change(screen.getByLabelText(/Effective Date/i), { target: { value: '2026-01-15' } });
    fireEvent.click(screen.getByRole('button', { name: /Preview/i }));
  }

  it('renders Step 3 preview after form submission', async () => {
    await fillAndSubmitNda();
    await waitFor(() => {
      expect(screen.getByText('Your Agreement is Ready')).toBeInTheDocument();
    });
  });

  it('shows the generated agreement text in the preview', async () => {
    await fillAndSubmitNda();
    await waitFor(() => {
      expect(screen.getByText(/Acme Corp/)).toBeInTheDocument();
      expect(screen.getByText(/Beta Inc/)).toBeInTheDocument();
    });
  });

  it('saves the agreement to localStorage', async () => {
    await fillAndSubmitNda();
    await waitFor(() => screen.getByText('Your Agreement is Ready'));
    const stored = JSON.parse(localStorage.getItem('lh_agreements') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].type).toBe('nda');
    expect(stored[0].state).toBe('CA');
    expect(stored[0].parties).toContain('Acme Corp');
  });

  it('uses a string UUID for the saved agreement id', async () => {
    await fillAndSubmitNda();
    await waitFor(() => screen.getByText('Your Agreement is Ready'));
    const stored = JSON.parse(localStorage.getItem('lh_agreements') || '[]');
    expect(typeof stored[0].id).toBe('string');
  });

  it('goes back to Step 2 from Step 3 when "Edit Details" is clicked', async () => {
    await fillAndSubmitNda();
    await waitFor(() => screen.getByRole('button', { name: /Edit Details/i }));
    fireEvent.click(screen.getByRole('button', { name: /Edit Details/i }));
    await waitFor(() => {
      expect(screen.getByText('Mutual Non-Disclosure Agreement Details')).toBeInTheDocument();
    });
  });

  it('"Start Over" resets wizard to Step 1', async () => {
    await fillAndSubmitNda();
    await waitFor(() => screen.getByRole('button', { name: /Start Over/i }));
    fireEvent.click(screen.getByRole('button', { name: /Start Over/i }));
    await waitFor(() => {
      expect(screen.getByText('Choose Agreement Type')).toBeInTheDocument();
    });
  });
});

describe('BuilderWizard — localStorage edge cases', () => {
  it('handles corrupted localStorage gracefully (does not crash)', async () => {
    localStorage.setItem('lh_agreements', 'not-valid-json{{{');
    expect(() => render(<BuilderWizard />)).not.toThrow();
  });

  it('handles non-array localStorage value gracefully', async () => {
    localStorage.setItem('lh_agreements', '"a string"');
    const user = userEvent.setup();
    render(<BuilderWizard />);

    fireEvent.click(screen.getByText('Mutual NDA'));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    await waitFor(() => screen.getByLabelText(/First Party/i));

    await user.type(screen.getByLabelText(/First Party/i), 'Acme');
    await user.type(screen.getByLabelText(/Second Party/i), 'Beta');
    await user.type(screen.getByLabelText(/Purpose/i), 'Test');
    await user.type(screen.getByLabelText(/Confidentiality Period/i), '1');
    fireEvent.change(screen.getByLabelText(/Effective Date/i), { target: { value: '2026-01-01' } });

    // Should not throw
    expect(() => fireEvent.click(screen.getByRole('button', { name: /Preview/i }))).not.toThrow();
    const stored = JSON.parse(localStorage.getItem('lh_agreements') || '[]');
    expect(Array.isArray(stored)).toBe(true);
    expect(stored).toHaveLength(1);
  });
});
