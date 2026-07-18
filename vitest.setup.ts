import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// ── Next.js mocks ────────────────────────────────────────────────────────────

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

vi.mock('next/link', () => ({
  default: ({ children, href, className, onClick, style }: {
    children: React.ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
  }) =>
    React.createElement('a', { href, className, onClick, style }, children),
}));

// ── localStorage mock ────────────────────────────────────────────────────────

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// ── Browser API stubs ────────────────────────────────────────────────────────

Object.defineProperty(window, 'crypto', {
  value: { randomUUID: () => `test-uuid-${Math.random().toString(36).slice(2)}` },
  writable: true,
});

URL.createObjectURL = vi.fn(() => 'blob:mock-url');
URL.revokeObjectURL = vi.fn();

Object.defineProperty(window.navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true,
  writable: true,
});

// Reset mocks between tests
beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});
