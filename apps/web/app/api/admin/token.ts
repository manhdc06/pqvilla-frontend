const BACKEND = 'https://backend-cong-manhs-projects.vercel.app';

let cachedToken: string | null = null;
let tokenExpiry = 0;

export async function getBackendToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch(`${BACKEND}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.ADMIN_EMAIL ?? 'admin@pqvilla.com',
      password: process.env.ADMIN_PASSWORD ?? '',
    }),
  });

  if (!res.ok) throw new Error('Backend auth failed');
  const { access_token } = await res.json();
  cachedToken = access_token;
  tokenExpiry = Date.now() + 50 * 60 * 1000; // 50 phút
  return access_token;
}

export { BACKEND };
