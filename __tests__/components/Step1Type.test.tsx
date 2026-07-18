import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Step1Type from '@/components/builder/Step1Type';
import { US_STATES } from '@/lib/states';
import { AgreementType } from '@/types/agreement';

const defaultProps = {
  selectedType: null,
  selectedState: '',
  states: US_STATES,
  onTypeSelect: vi.fn(),
  onStateSelect: vi.fn(),
  onNext: vi.fn(),
};

describe('Step1Type', () => {
  it('renders all 4 agreement type cards', () => {
    render(<Step1Type {...defaultProps} />);
    expect(screen.getByText('Mutual NDA')).toBeInTheDocument();
    expect(screen.getByText('Employment Contract')).toBeInTheDocument();
    expect(screen.getByText('Freelance Agreement')).toBeInTheDocument();
    expect(screen.getByText('Lease Agreement')).toBeInTheDocument();
  });

  it('renders the state selector dropdown', () => {
    render(<Step1Type {...defaultProps} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all 50 states in the dropdown', () => {
    render(<Step1Type {...defaultProps} />);
    const select = screen.getByRole('combobox');
    // +1 for the placeholder option
    expect(select.querySelectorAll('option')).toHaveLength(51);
  });

  it('Next button is disabled when neither type nor state is selected', () => {
    render(<Step1Type {...defaultProps} />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('Next button is disabled when type is selected but state is not', () => {
    render(<Step1Type {...defaultProps} selectedType="nda" />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('Next button is disabled when state is selected but type is not', () => {
    render(<Step1Type {...defaultProps} selectedState="CA" />);
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('Next button is enabled when both type and state are selected', () => {
    render(<Step1Type {...defaultProps} selectedType="nda" selectedState="CA" />);
    expect(screen.getByRole('button', { name: /Next/i })).not.toBeDisabled();
  });

  it('calls onTypeSelect with the correct type when a card is clicked', () => {
    const onTypeSelect = vi.fn();
    render(<Step1Type {...defaultProps} onTypeSelect={onTypeSelect} />);
    fireEvent.click(screen.getByText('Mutual NDA'));
    expect(onTypeSelect).toHaveBeenCalledWith('nda');
  });

  it('calls onTypeSelect with "employment" for the employment card', () => {
    const onTypeSelect = vi.fn();
    render(<Step1Type {...defaultProps} onTypeSelect={onTypeSelect} />);
    fireEvent.click(screen.getByText('Employment Contract'));
    expect(onTypeSelect).toHaveBeenCalledWith('employment');
  });

  it('calls onTypeSelect with "freelance" for the freelance card', () => {
    const onTypeSelect = vi.fn();
    render(<Step1Type {...defaultProps} onTypeSelect={onTypeSelect} />);
    fireEvent.click(screen.getByText('Freelance Agreement'));
    expect(onTypeSelect).toHaveBeenCalledWith('freelance');
  });

  it('calls onTypeSelect with "lease" for the lease card', () => {
    const onTypeSelect = vi.fn();
    render(<Step1Type {...defaultProps} onTypeSelect={onTypeSelect} />);
    fireEvent.click(screen.getByText('Lease Agreement'));
    expect(onTypeSelect).toHaveBeenCalledWith('lease');
  });

  it('applies "selected" class to the currently selected type card', () => {
    render(<Step1Type {...defaultProps} selectedType="nda" />);
    const ndaCard = screen.getByText('Mutual NDA').closest('button');
    expect(ndaCard).toHaveClass('selected');
  });

  it('does not apply "selected" class to non-selected type cards', () => {
    render(<Step1Type {...defaultProps} selectedType="nda" />);
    const employmentCard = screen.getByText('Employment Contract').closest('button');
    expect(employmentCard).not.toHaveClass('selected');
  });

  it('calls onStateSelect when dropdown changes', () => {
    const onStateSelect = vi.fn();
    render(<Step1Type {...defaultProps} onStateSelect={onStateSelect} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'CA' } });
    expect(onStateSelect).toHaveBeenCalledWith('CA');
  });

  it('calls onNext when Next button is clicked (both type and state selected)', () => {
    const onNext = vi.fn();
    render(<Step1Type {...defaultProps} selectedType="nda" selectedState="CA" onNext={onNext} />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('shows the selected state in the dropdown', () => {
    render(<Step1Type {...defaultProps} selectedState="TX" />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('TX');
  });
});
