import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const testDb = new Database(':memory:');
testDb.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
}));

import { signUp, signIn } from '@/lib/authService';

describe('authService', () => {
  const originalSecret = process.env.SESSION_SECRET;

  beforeEach(() => {
    process.env.SESSION_SECRET = 'test-secret';
    testDb.exec('DELETE FROM users');
  });

  afterEach(() => {
    process.env.SESSION_SECRET = originalSecret;
  });

  describe('signUp', () => {
    it('creates a user and returns a session value', async () => {
      const result = await signUp('New@Example.com', 'password123');

      expect(result.ok).toBe(true);
      if (result.ok) {
        expect(result.email).toBe('new@example.com'); // normalized to lowercase
        expect(result.sessionValue).toContain('.');
      }
    });

    it('stores a bcrypt hash, never the plaintext password', async () => {
      await signUp('a@b.com', 'password123');
      const row = testDb.prepare('SELECT password_hash FROM users WHERE email = ?').get('a@b.com') as {
        password_hash: string;
      };
      expect(row.password_hash).not.toBe('password123');
      expect(row.password_hash).toMatch(/^\$2[aby]\$/);
    });

    it('rejects an invalid email', async () => {
      const result = await signUp('not-an-email', 'password123');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(400);
    });

    it('rejects a password shorter than 8 characters', async () => {
      const result = await signUp('a@b.com', 'short');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(400);
    });

    it('rejects a duplicate email', async () => {
      await signUp('dup@example.com', 'password123');
      const result = await signUp('dup@example.com', 'anotherpassword');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(409);
    });

    it('treats emails as case-insensitive for duplicates', async () => {
      await signUp('Case@Example.com', 'password123');
      const result = await signUp('case@example.com', 'password123');
      expect(result.ok).toBe(false);
    });
  });

  describe('signIn', () => {
    it('succeeds with the correct password', async () => {
      await signUp('login@example.com', 'correct-password');
      const result = await signIn('login@example.com', 'correct-password');
      expect(result.ok).toBe(true);
    });

    it('fails with the wrong password', async () => {
      await signUp('login2@example.com', 'correct-password');
      const result = await signIn('login2@example.com', 'wrong-password');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(401);
    });

    it('fails for a nonexistent email with the same generic error as a wrong password', async () => {
      const result = await signIn('nobody@example.com', 'whatever123');
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(401);
        expect(result.error).toBe('Invalid email or password');
      }
    });

    it('still runs a bcrypt comparison for a nonexistent email, to avoid a timing side-channel', async () => {
      const compareSpy = vi.spyOn(bcrypt, 'compare');
      await signIn('nobody-else@example.com', 'whatever123');
      expect(compareSpy).toHaveBeenCalled();
      compareSpy.mockRestore();
    });
  });

  describe('when SESSION_SECRET is not configured', () => {
    beforeEach(() => {
      delete process.env.SESSION_SECRET;
    });

    it('signUp fails with a clean 500 instead of throwing', async () => {
      const result = await signUp('nosecret@example.com', 'password123');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(500);
    });

    it('signUp does not create a user row when misconfigured', async () => {
      await signUp('nosecret@example.com', 'password123');
      const row = testDb.prepare('SELECT id FROM users WHERE email = ?').get('nosecret@example.com');
      expect(row).toBeUndefined();
    });

    it('signIn fails with a clean 500 instead of throwing, even with correct credentials', async () => {
      process.env.SESSION_SECRET = 'test-secret';
      await signUp('nosecret2@example.com', 'password123');
      delete process.env.SESSION_SECRET;

      const result = await signIn('nosecret2@example.com', 'password123');
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.status).toBe(500);
    });
  });
});
