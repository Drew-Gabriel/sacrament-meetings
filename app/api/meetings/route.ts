import { NextRequest, NextResponse } from 'next/server';
import { getMeetings, getMeetingByDate } from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  if (date) {
    return NextResponse.json(getMeetingByDate(date));
  }

  return NextResponse.json(getMeetings());
}