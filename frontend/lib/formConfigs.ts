import { AgreementType, FormConfig } from '@/types/agreement';

export const FORM_CONFIGS: Record<AgreementType, FormConfig> = {
  nda: {
    title: 'Mutual Non-Disclosure Agreement Details',
    fields: [
      { id: 'partyA', label: 'First Party (Full Name / Company)', placeholder: 'e.g. Acme Corp Ltd', required: true },
      { id: 'partyB', label: 'Second Party (Full Name / Company)', placeholder: 'e.g. Beta Ventures Inc', required: true },
      { id: 'purpose', label: 'Purpose of Disclosure', placeholder: 'e.g. Evaluation of a potential business partnership', required: true },
      { id: 'duration', label: 'Confidentiality Period (years)', placeholder: 'e.g. 2', required: true, type: 'number', min: 1 },
      { id: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
    ],
  },
  employment: {
    title: 'Employment Contract Details',
    fields: [
      { id: 'employer', label: 'Employer (Company Name)', placeholder: 'e.g. Acme Corp Ltd', required: true },
      { id: 'employee', label: 'Employee (Full Name)', placeholder: 'e.g. Jane Doe', required: true },
      { id: 'position', label: 'Job Title / Position', placeholder: 'e.g. Senior Developer', required: true },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'salary', label: 'Annual Salary (USD)', placeholder: 'e.g. 75,000', required: true },
      { id: 'hours', label: 'Weekly Working Hours', placeholder: 'e.g. 40', required: true, type: 'number', min: 1 },
      { id: 'location', label: 'Place of Work', placeholder: 'e.g. Austin, TX / Remote', required: true },
      { id: 'noticePeriod', label: 'Notice Period (weeks)', placeholder: 'e.g. 4', required: true, type: 'number', min: 1 },
    ],
  },
  freelance: {
    title: 'Freelance / Service Agreement Details',
    fields: [
      { id: 'client', label: 'Client (Full Name / Company)', placeholder: 'e.g. Acme Corp Ltd', required: true },
      { id: 'contractor', label: 'Contractor (Full Name / Company)', placeholder: 'e.g. Jane Doe', required: true },
      { id: 'services', label: 'Description of Services', placeholder: 'e.g. Web design and development of a 5-page website', required: true, type: 'textarea' },
      { id: 'startDate', label: 'Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'Expected End Date', type: 'date', required: true },
      { id: 'rate', label: 'Rate (USD)', placeholder: 'e.g. 5,000 fixed or 150/hour', required: true },
      { id: 'paymentTerms', label: 'Payment Terms', placeholder: 'e.g. 50% upfront, 50% on delivery', required: true },
    ],
  },
  lease: {
    title: 'Lease Agreement Details',
    fields: [
      { id: 'landlord', label: 'Landlord (Full Name / Company)', placeholder: 'e.g. Acme Properties LLC', required: true },
      { id: 'tenant', label: 'Tenant (Full Name)', placeholder: 'e.g. John Smith', required: true },
      { id: 'property', label: 'Property Address', placeholder: 'e.g. 123 Main St, Austin, TX', required: true },
      { id: 'startDate', label: 'Lease Start Date', type: 'date', required: true },
      { id: 'endDate', label: 'Lease End Date', type: 'date', required: true },
      { id: 'rent', label: 'Monthly Rent (USD)', placeholder: 'e.g. 2,500', required: true },
      { id: 'deposit', label: 'Security Deposit (USD)', placeholder: 'e.g. 5,000', required: true },
      { id: 'utilities', label: 'Utilities Responsibility', placeholder: 'e.g. Tenant pays all utilities', required: true },
    ],
  },
};

export function getParties(type: AgreementType, values: Record<string, string>): string {
  switch (type) {
    case 'nda':        return `${values.partyA} / ${values.partyB}`;
    case 'employment': return `${values.employer} / ${values.employee}`;
    case 'freelance':  return `${values.client} / ${values.contractor}`;
    case 'lease':      return `${values.landlord} / ${values.tenant}`;
  }
}
