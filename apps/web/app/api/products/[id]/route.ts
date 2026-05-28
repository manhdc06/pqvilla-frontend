import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'https://backend-cong-manhs-projects.vercel.app';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await fetch(`${BACKEND}/api/products/${id}`, { cache: 'no-store' });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
