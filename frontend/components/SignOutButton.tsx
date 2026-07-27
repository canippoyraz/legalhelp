'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignOutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleSignOut() {
    setSubmitting(true);
    await fetch('/api/auth/signout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }

  return (
    <button className="btn btn--outline" onClick={handleSignOut} disabled={submitting}>
      {submitting ? 'Signing out…' : 'Sign Out'}
    </button>
  );
}
