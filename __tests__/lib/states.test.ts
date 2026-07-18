import { describe, it, expect } from 'vitest';
import { US_STATES, getStateName } from '@/lib/states';

describe('US_STATES', () => {
  it('contains exactly 50 states', () => {
    expect(US_STATES).toHaveLength(50);
  });

  it('every code is exactly 2 uppercase letters', () => {
    for (const [code] of US_STATES) {
      expect(code).toMatch(/^[A-Z]{2}$/);
    }
  });

  it('every name is a non-empty string', () => {
    for (const [, name] of US_STATES) {
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('codes are unique', () => {
    const codes = US_STATES.map(([c]) => c);
    expect(new Set(codes).size).toBe(50);
  });

  it('includes expected states', () => {
    const codes = US_STATES.map(([c]) => c);
    expect(codes).toContain('CA');
    expect(codes).toContain('NY');
    expect(codes).toContain('TX');
    expect(codes).toContain('FL');
    expect(codes).toContain('WA');
    expect(codes).toContain('IL');
  });
});

describe('getStateName', () => {
  it('returns the full name for a valid code', () => {
    expect(getStateName('CA')).toBe('California');
    expect(getStateName('NY')).toBe('New York');
    expect(getStateName('TX')).toBe('Texas');
    expect(getStateName('FL')).toBe('Florida');
    expect(getStateName('WA')).toBe('Washington');
    expect(getStateName('IL')).toBe('Illinois');
  });

  it('returns the code itself as fallback for unknown codes', () => {
    expect(getStateName('XX')).toBe('XX');
    expect(getStateName('')).toBe('');
  });

  it('is case-sensitive — lowercase code returns fallback', () => {
    expect(getStateName('ca')).toBe('ca');
  });
});
