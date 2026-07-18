import { describe, it, expect } from 'vitest';
import { generateAgreementText } from '@/lib/templates';

const NDA_VALUES = {
  partyA: 'Acme Corp Ltd',
  partyB: 'Beta Ventures Inc',
  purpose: 'Evaluation of a potential business partnership',
  duration: '2',
  effectiveDate: '2026-01-15',
};

const EMPLOYMENT_VALUES = {
  employer: 'Big Company LLC',
  employee: 'Jane Doe',
  position: 'Senior Developer',
  startDate: '2026-02-01',
  salary: '90,000',
  hours: '40',
  location: 'Austin, TX',
  noticePeriod: '4',
};

const FREELANCE_VALUES = {
  client: 'Client Corp',
  contractor: 'Dev Studio Ltd',
  services: 'Web design and development',
  startDate: '2026-03-01',
  endDate: '2026-06-30',
  rate: '5,000',
  paymentTerms: '50% upfront, 50% on delivery',
};

const LEASE_VALUES = {
  landlord: 'Property Mgmt LLC',
  tenant: 'John Smith',
  property: '123 Main St, Austin, TX 78701',
  startDate: '2026-04-01',
  endDate: '2027-03-31',
  rent: '2,500',
  deposit: '5,000',
  utilities: 'Tenant pays all utilities',
};

describe('generateAgreementText — NDA', () => {
  const text = generateAgreementText('nda', NDA_VALUES, 'CA', 'California');

  it('starts with a non-empty string', () => {
    expect(text.length).toBeGreaterThan(100);
  });

  it('includes MUTUAL in the heading', () => {
    expect(text).toMatch(/MUTUAL/i);
  });

  it('includes both party names', () => {
    expect(text).toContain('Acme Corp Ltd');
    expect(text).toContain('Beta Ventures Inc');
  });

  it('includes the purpose', () => {
    expect(text).toContain('Evaluation of a potential business partnership');
  });

  it('includes the duration', () => {
    expect(text).toContain('2 year(s)');
  });

  it('includes the effective date', () => {
    expect(text).toContain('2026-01-15');
  });

  it('includes CA-specific provision content', () => {
    expect(text).toMatch(/California/i);
  });

  it('includes signature lines for both parties', () => {
    expect(text).toMatch(/FIRST PARTY/);
    expect(text).toMatch(/SECOND PARTY/);
    expect(text).toMatch(/Signature:/);
  });

  it('separator lines use only ASCII characters (no U+2500 box-drawing)', () => {
    expect(text).not.toMatch(/─/);
  });

  it('uses default provision for non-listed state', () => {
    const textMT = generateAgreementText('nda', NDA_VALUES, 'MT', 'Montana');
    expect(textMT).toMatch(/Defend Trade Secrets Act/i);
  });
});

describe('generateAgreementText — Employment', () => {
  const text = generateAgreementText('employment', EMPLOYMENT_VALUES, 'TX', 'Texas');

  it('includes employer and employee names', () => {
    expect(text).toContain('Big Company LLC');
    expect(text).toContain('Jane Doe');
  });

  it('includes position, salary, hours, and notice period', () => {
    expect(text).toContain('Senior Developer');
    expect(text).toContain('90,000');
    expect(text).toContain('40 hours');
    expect(text).toContain('4 weeks');
  });

  it('includes TX-specific provision', () => {
    expect(text).toMatch(/Texas/i);
  });

  it('includes place of work', () => {
    expect(text).toContain('Austin, TX');
  });
});

describe('generateAgreementText — Freelance', () => {
  const text = generateAgreementText('freelance', FREELANCE_VALUES, 'NY', 'New York');

  it('includes client and contractor names', () => {
    expect(text).toContain('Client Corp');
    expect(text).toContain('Dev Studio Ltd');
  });

  it('includes services description', () => {
    expect(text).toContain('Web design and development');
  });

  it('includes rate and payment terms', () => {
    expect(text).toContain('5,000');
    expect(text).toContain('50% upfront, 50% on delivery');
  });

  it('includes NY-specific provision', () => {
    expect(text).toMatch(/New York/i);
  });

  it('mentions independent contractor status', () => {
    expect(text).toMatch(/independent contractor/i);
  });
});

describe('generateAgreementText — Lease', () => {
  const text = generateAgreementText('lease', LEASE_VALUES, 'FL', 'Florida');

  it('includes landlord and tenant names', () => {
    expect(text).toContain('Property Mgmt LLC');
    expect(text).toContain('John Smith');
  });

  it('includes property address', () => {
    expect(text).toContain('123 Main St, Austin, TX 78701');
  });

  it('includes rent and deposit amounts', () => {
    expect(text).toContain('2,500');
    expect(text).toContain('5,000');
  });

  it('includes utilities responsibility', () => {
    expect(text).toContain('Tenant pays all utilities');
  });

  it('includes FL-specific provision', () => {
    expect(text).toMatch(/Florida/i);
  });

  it('includes disclaimer', () => {
    expect(text).toMatch(/template only/i);
  });
});

describe('generateAgreementText — all types produce trimmed output', () => {
  it('NDA result does not start or end with whitespace', () => {
    const t = generateAgreementText('nda', NDA_VALUES, 'CA', 'California');
    expect(t).toBe(t.trim());
  });

  it('Employment result does not start or end with whitespace', () => {
    const t = generateAgreementText('employment', EMPLOYMENT_VALUES, 'TX', 'Texas');
    expect(t).toBe(t.trim());
  });
});
