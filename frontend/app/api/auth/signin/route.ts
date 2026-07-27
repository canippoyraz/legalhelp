import { cookies } from 'next/headers';
import { signIn } from '@/lib/authService';
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE } from '@/lib/session';

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const result = await signIn(body.email, body.password);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, result.sessionValue, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  });

  return Response.json({ email: result.email });
}
