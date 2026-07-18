import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2Details from '@/components/builder/Step2Details';
import { FORM_CONFIGS } from '@/lib/formConfigs';

const ndaConfig = FORM_CONFIGS.nda;

const defaultProps = {
  type: 'nda' as const,
  config: ndaConfig,
  stateName: 'California',
  stateCode: 'CA',
  onBack: vi.fn(),
  onGenerate: vi.fn(),
};

describe('Step2Details', () => {
  it('renders the form title', () => {
    render(<Step2Details {...defaultProps} />);
    expect(screen.getByText(ndaConfig.title)).toBeInTheDocument();
  });

  it('renders the state badge', () => {
    render(<Step2Details {...defaultProps} />);
    expect(screen.getByText(/California/)).toBeInTheDocument();
    expect(screen.getByText(/CA/)).toBeInTheDocument();
  });

  it('renders all fields from the config', () => {
    render(<Step2Details {...defaultProps} />);
    for (const field of ndaConfig.fields) {
      // Split before escaping so (parens) in labels don't corrupt the regex
      const baseLabel = field.label.split('(')[0].trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      expect(screen.getByLabelText(new RegExp(baseLabel, 'i'))).toBeInTheDocument();
    }
  });

  it('renders a textarea for textarea-type fields', () => {
    render(<Step2Details {...defaultProps} config={FORM_CONFIGS.freelance} type="freelance" />);
    expect(screen.getByRole('textbox', { name: /Description of Services/i })).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('renders a date input for date-type fields', () => {
    render(<Step2Details {...defaultProps} />);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    expect(dateInputs.length).toBeGreaterThan(0);
  });

  it('renders number inputs with min="1" for number-type fields', () => {
    render(<Step2Details {...defaultProps} />);
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
      expect((input as HTMLInputElement).min).toBe('1');
    });
  });

  it('calls onBack when Back button is clicked', () => {
    const onBack = vi.fn();
    render(<Step2Details {...defaultProps} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onGenerate with field values on form submit', async () => {
    const onGenerate = vi.fn();
    const user = userEvent.setup();
    render(<Step2Details {...defaultProps} onGenerate={onGenerate} />);

    await user.type(screen.getByLabelText(/First Party/i), 'Acme Corp');
    await user.type(screen.getByLabelText(/Second Party/i), 'Beta Inc');
    await user.type(screen.getByLabelText(/Purpose/i), 'Partnership eval');
    await user.type(screen.getByLabelText(/Confidentiality Period/i), '2');
    // Set date using fireEvent (userEvent has issues with date inputs)
    fireEvent.change(screen.getByLabelText(/Effective Date/i), { target: { value: '2026-01-15' } });

    fireEvent.click(screen.getByRole('button', { name: /Preview/i }));

    expect(onGenerate).toHaveBeenCalledWith(
      expect.objectContaining({
        partyA: 'Acme Corp',
        partyB: 'Beta Inc',
        purpose: 'Partnership eval',
        duration: '2',
        effectiveDate: '2026-01-15',
      })
    );
  });

  it('updates field values as the user types', async () => {
    const user = userEvent.setup();
    render(<Step2Details {...defaultProps} />);
    const input = screen.getByLabelText(/First Party/i) as HTMLInputElement;
    await user.type(input, 'My Company');
    expect(input.value).toBe('My Company');
  });

  it('renders employment config correctly', () => {
    render(<Step2Details {...defaultProps} type="employment" config={FORM_CONFIGS.employment} />);
    expect(screen.getByLabelText(/Employer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Employee/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Annual Salary/i)).toBeInTheDocument();
  });

  it('renders lease config correctly', () => {
    render(<Step2Details {...defaultProps} type="lease" config={FORM_CONFIGS.lease} />);
    expect(screen.getByLabelText(/Landlord/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tenant/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Monthly Rent/i)).toBeInTheDocument();
  });
});
