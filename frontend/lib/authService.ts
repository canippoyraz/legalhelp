import bcrypt from 'bcryptjs';
import { getDb } from './db';
import { createSessionValue } from './session';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_ROUNDS = 12;

// Compared against when no user is found, so signIn() takes the same time
// whether or not the email is registered — otherwise response latency alone
// leaks which emails have accounts (a bcrypt timing side-channel).
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('no-such-account-timing-safeguard', BCRYPT_ROUNDS);

export type AuthResult =
  | { ok: true; email: string; sessionValue: string }
  | { ok: false; status: number; error: string };

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
}

function normalizeCredentials(rawEmail: unknown, rawPassword: unknown): { email: string; password: string } | null {
  if (typeof rawEmail !== 'string' || typeof rawPassword !== 'string') return null;
  return { email: rawEmail.trim().toLowerCase(), password: rawPassword };
}

export async function signUp(rawEmail: unknown, rawPassword: unknown): Promise<AuthResult> {
  const creds = normalizeCredentials(rawEmail, rawPassword);
  if (!creds || !EMAIL_RE.test(creds.email)) {
    return { ok: false, status: 400, error: 'Enter a valid email address' };
  }
  if (creds.password.length < MIN_PASSWORD_LENGTH) {
    return { ok: false, status: 400, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
  }

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(creds.email) as { id: number } | undefined;
  if (existing) {
    return { ok: false, status: 409, error: 'An account with this email already exists' };
  }

  const passwordHash = await bcrypt.hash(creds.password, BCRYPT_ROUNDS);
  const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(creds.email, passwordHash);

  const sessionValue = createSessionValue({ uid: Number(result.lastInsertRowid), email: creds.email });
  return { ok: true, email: creds.email, sessionValue };
}

export async function signIn(rawEmail: unknown, rawPassword: unknown): Promise<AuthResult> {
  const genericError = { ok: false as const, status: 401, error: 'Invalid email or password' };

  const creds = normalizeCredentials(rawEmail, rawPassword);
  if (!creds || !creds.email || !creds.password) return genericError;

  const db = getDb();
  const user = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?').get(creds.email) as
    | UserRow
    | undefined;

  const valid = await bcrypt.compare(creds.password, user?.password_hash ?? DUMMY_PASSWORD_HASH);
  if (!user || !valid) return genericError;

  const sessionValue = createSessionValue({ uid: user.id, email: user.email });
  return { ok: true, email: user.email, sessionValue };
}
