import { cookies } from 'next/headers';
import { verifySessionValue, SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET() {
  const cookieStore = await cookies();
  const session = verifySessionValue(cookieStore.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return new Response(null, { status: 401 });
  return Response.json({ email: session.email });
}
