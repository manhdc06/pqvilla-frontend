import { NextResponse } from 'next/server';

const BACKEND = 'https://backend-cong-manhs-projects.vercel.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const url = limit
    ? `${BACKEND}/api/products?limit=${limit}`
    : `${BACKEND}/api/products`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data);
}
