import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SignOutButton from '@/components/SignOutButton';
import { verifySessionValue, SESSION_COOKIE_NAME } from '@/lib/session';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const session = verifySessionValue(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (!session) redirect('/signin');

  return (
    <>
      <Navigation />
      <div className="container auth-page">
        <div className="details-form auth-card">
          <h1>Account</h1>
          <p className="auth-subtitle">
            Signed in as <strong>{session.email}</strong>
          </p>
          <SignOutButton />
        </div>
      </div>
      <Footer />
    </>
  );
}
