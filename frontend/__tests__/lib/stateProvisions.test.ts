import { describe, it, expect } from 'vitest';
import { getStateProvision } from '@/lib/stateProvisions';
import { AgreementType } from '@/types/agreement';

const ALL_TYPES: AgreementType[] = ['nda', 'employment', 'freelance', 'lease'];
const SPECIFIC_STATES = ['CA', 'NY', 'TX', 'FL', 'IL', 'WA'];

describe('getStateProvision', () => {
  it('returns a non-empty string for every type × specific-state combination', () => {
    for (const type of ALL_TYPES) {
      for (const state of SPECIFIC_STATES) {
        const provision = getStateProvision(type, state);
        expect(typeof provision).toBe('string');
        expect(provision.length).toBeGreaterThan(50);
      }
    }
  });

  it('returns _default fallback for unknown states', () => {
    for (const type of ALL_TYPES) {
      const provision = getStateProvision(type, 'ZZ');
      expect(typeof provision).toBe('string');
      expect(provision.length).toBeGreaterThan(20);
    }
  });

  it('CA and NY provisions are distinct for NDA', () => {
    expect(getStateProvision('nda', 'CA')).not.toBe(getStateProvision('nda', 'NY'));
  });

  it('CA provisions differ across agreement types', () => {
    const provisions = ALL_TYPES.map(t => getStateProvision(t, 'CA'));
    const unique = new Set(provisions);
    expect(unique.size).toBe(ALL_TYPES.length);
  });

  it('NDA CA provision mentions California civil code', () => {
    const provision = getStateProvision('nda', 'CA');
    expect(provision).toMatch(/California/i);
  });

  it('employment CA provision mentions at-will employment', () => {
    const provision = getStateProvision('employment', 'CA');
    expect(provision).toMatch(/at-will/i);
  });

  it('freelance CA provision mentions ABC test', () => {
    const provision = getStateProvision('freelance', 'CA');
    expect(provision).toMatch(/ABC/i);
  });

  it('lease CA provision mentions security deposit', () => {
    const provision = getStateProvision('lease', 'CA');
    expect(provision).toMatch(/security deposit/i);
  });

  it('_default provisions do not include state-specific names', () => {
    const ndaDefault = getStateProvision('nda', 'MT');
    expect(ndaDefault).toMatch(/Defend Trade Secrets Act/i);
  });

  it('specific state provisions for employment include non-compete references where relevant', () => {
    expect(getStateProvision('employment', 'CA')).toMatch(/non-compete/i);
    expect(getStateProvision('employment', 'IL')).toMatch(/non-compete/i);
  });
});
