import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET() {
  const meetings = await getMeetings();

  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    return NextResponse.json(
      { error: 'No meetings found' },
      { status: 404 },
    );
  }

  return NextResponse.json(currentMeeting);
}