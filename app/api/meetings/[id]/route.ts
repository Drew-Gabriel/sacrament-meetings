import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;
  const meetingId = Number(id);

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { error: 'Meeting not found' },
      { status: 404 },
    );
  }

  return NextResponse.json(meeting);
}