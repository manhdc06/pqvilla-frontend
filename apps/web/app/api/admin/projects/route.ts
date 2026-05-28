import { NextRequest, NextResponse } from 'next/server';

import { BACKEND, getBackendToken } from '../token';

export async function POST(request: NextRequest) {
  const token = await getBackendToken();
  const formData = await request.formData();

  const res = await fetch(`${BACKEND}/api/projects`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
