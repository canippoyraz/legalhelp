import { describe, it, expect } from 'vitest';
import { FORM_CONFIGS, getParties } from '@/lib/formConfigs';
import { AgreementType } from '@/types/agreement';

const ALL_TYPES: AgreementType[] = ['nda', 'employment', 'freelance', 'lease'];

describe('FORM_CONFIGS', () => {
  it('has a config for every agreement type', () => {
    for (const type of ALL_TYPES) {
      expect(FORM_CONFIGS[type]).toBeDefined();
    }
  });

  it('every config has a non-empty title and at least one field', () => {
    for (const type of ALL_TYPES) {
      const cfg = FORM_CONFIGS[type];
      expect(cfg.title.length).toBeGreaterThan(0);
      expect(cfg.fields.length).toBeGreaterThan(0);
    }
  });

  it('every field has an id and label', () => {
    for (const type of ALL_TYPES) {
      for (const field of FORM_CONFIGS[type].fields) {
        expect(field.id.length).toBeGreaterThan(0);
        expect(field.label.length).toBeGreaterThan(0);
      }
    }
  });

  it('number fields have min: 1 to prevent zero/negative values', () => {
    for (const type of ALL_TYPES) {
      for (const field of FORM_CONFIGS[type].fields) {
        if (field.type === 'number') {
          expect(field.min).toBeGreaterThanOrEqual(1);
        }
      }
    }
  });

  it('NDA config has the correct fields', () => {
    const ids = FORM_CONFIGS.nda.fields.map(f => f.id);
    expect(ids).toContain('partyA');
    expect(ids).toContain('partyB');
    expect(ids).toContain('purpose');
    expect(ids).toContain('duration');
    expect(ids).toContain('effectiveDate');
  });

  it('employment config has the correct fields', () => {
    const ids = FORM_CONFIGS.employment.fields.map(f => f.id);
    expect(ids).toContain('employer');
    expect(ids).toContain('employee');
    expect(ids).toContain('salary');
    expect(ids).toContain('hours');
    expect(ids).toContain('noticePeriod');
  });

  it('freelance config has a textarea field for services', () => {
    const services = FORM_CONFIGS.freelance.fields.find(f => f.id === 'services');
    expect(services).toBeDefined();
    expect(services?.type).toBe('textarea');
  });

  it('lease config has the correct fields', () => {
    const ids = FORM_CONFIGS.lease.fields.map(f => f.id);
    expect(ids).toContain('landlord');
    expect(ids).toContain('tenant');
    expect(ids).toContain('property');
    expect(ids).toContain('rent');
    expect(ids).toContain('deposit');
  });

  it('field ids within each config are unique', () => {
    for (const type of ALL_TYPES) {
      const ids = FORM_CONFIGS[type].fields.map(f => f.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });
});

describe('getParties', () => {
  it('returns "partyA / partyB" for NDA', () => {
    expect(getParties('nda', { partyA: 'Acme Corp', partyB: 'Beta Inc' }))
      .toBe('Acme Corp / Beta Inc');
  });

  it('returns "employer / employee" for employment', () => {
    expect(getParties('employment', { employer: 'Big Co', employee: 'Jane Doe' }))
      .toBe('Big Co / Jane Doe');
  });

  it('returns "client / contractor" for freelance', () => {
    expect(getParties('freelance', { client: 'Client LLC', contractor: 'Dev Studio' }))
      .toBe('Client LLC / Dev Studio');
  });

  it('returns "landlord / tenant" for lease', () => {
    expect(getParties('lease', { landlord: 'Landlord Ltd', tenant: 'John Smith' }))
      .toBe('Landlord Ltd / John Smith');
  });
});
