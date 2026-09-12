import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET() {
  const meetings = getMeetings();

  if (meetings.length === 0) {
    return NextResponse.json(
      { error: 'No meetings found' },
      { status: 404 }
    );
  }

  const currentMeeting = meetings[meetings.length - 1];

  return NextResponse.json(currentMeeting);
}