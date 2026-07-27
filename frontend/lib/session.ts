import { createHmac, timingSafeEqual } from 'crypto';

export interface SessionPayload {
  uid: number;
  email: string;
  exp: number;
}

export const SESSION_COOKIE_NAME = 'lh_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

export function hasSessionSecret(): boolean {
  return Boolean(process.env.SESSION_SECRET);
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  return secret;
}

function sign(data: string): string {
  return createHmac('sha256', getSecret()).update(data).digest('base64url');
}

export function createSessionValue(payload: Omit<SessionPayload, 'exp'>): string {
  const full: SessionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const data = Buffer.from(JSON.stringify(full)).toString('base64url');
  return `${data}.${sign(data)}`;
}

export function verifySessionValue(value: string | undefined): SessionPayload | null {
  if (!value) return null;
  const [data, signature] = value.split('.');
  if (!data || !signature) return null;

  const expected = sign(data);
  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (signatureBuf.length !== expectedBuf.length || !timingSafeEqual(signatureBuf, expectedBuf)) {
    return null;
  }

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
  } catch {
    return null;
  }

  if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }
  return payload;
}
