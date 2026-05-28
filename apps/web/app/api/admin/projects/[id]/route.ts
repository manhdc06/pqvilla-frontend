import { NextRequest, NextResponse } from 'next/server';

import { BACKEND, getBackendToken } from '../../token';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = await getBackendToken();
  const formData = await request.formData();

  const res = await fetch(`${BACKEND}/api/projects/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const token = await getBackendToken();

  const res = await fetch(`${BACKEND}/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 204) return new NextResponse(null, { status: 204 });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
