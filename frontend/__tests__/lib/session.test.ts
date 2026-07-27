import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createHmac } from 'crypto';
import { createSessionValue, verifySessionValue, SESSION_MAX_AGE } from '@/lib/session';

describe('session', () => {
  const originalSecret = process.env.SESSION_SECRET;

  beforeEach(() => {
    process.env.SESSION_SECRET = 'test-secret';
  });

  afterEach(() => {
    process.env.SESSION_SECRET = originalSecret;
  });

  it('creates a value that verifies back to the same payload', () => {
    const value = createSessionValue({ uid: 1, email: 'a@b.com' });
    const payload = verifySessionValue(value);

    expect(payload?.uid).toBe(1);
    expect(payload?.email).toBe('a@b.com');
    expect(payload?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('sets expiry roughly SESSION_MAX_AGE seconds in the future', () => {
    const before = Math.floor(Date.now() / 1000);
    const value = createSessionValue({ uid: 1, email: 'a@b.com' });
    const payload = verifySessionValue(value);

    expect(payload!.exp).toBeGreaterThanOrEqual(before + SESSION_MAX_AGE - 2);
    expect(payload!.exp).toBeLessThanOrEqual(before + SESSION_MAX_AGE + 2);
  });

  it('rejects an undefined value', () => {
    expect(verifySessionValue(undefined)).toBeNull();
  });

  it('rejects a malformed value with no signature', () => {
    expect(verifySessionValue('not-a-real-session-value')).toBeNull();
  });

  it('rejects a value with a tampered payload', () => {
    const value = createSessionValue({ uid: 1, email: 'a@b.com' });
    const [data, signature] = value.split('.');
    const tamperedPayload = Buffer.from(JSON.stringify({ uid: 999, email: 'attacker@evil.com', exp: 9999999999 })).toString(
      'base64url',
    );
    expect(verifySessionValue(`${tamperedPayload}.${signature}`)).toBeNull();
    expect(data).not.toBe(tamperedPayload);
  });

  it('rejects a value signed with a different secret', () => {
    const value = createSessionValue({ uid: 1, email: 'a@b.com' });
    process.env.SESSION_SECRET = 'a-different-secret';
    expect(verifySessionValue(value)).toBeNull();
  });

  it('rejects an expired session', () => {
    const [data] = createSessionValue({ uid: 1, email: 'a@b.com' }).split('.');
    const expiredPayload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    expiredPayload.exp = Math.floor(Date.now() / 1000) - 10;

    const expiredData = Buffer.from(JSON.stringify(expiredPayload)).toString('base64url');
    const expiredSignature = createHmac('sha256', 'test-secret').update(expiredData).digest('base64url');

    expect(verifySessionValue(`${expiredData}.${expiredSignature}`)).toBeNull();
  });

  it('throws when SESSION_SECRET is not configured', () => {
    delete process.env.SESSION_SECRET;
    expect(() => createSessionValue({ uid: 1, email: 'a@b.com' })).toThrow();
  });
});
