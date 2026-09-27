import { getMeetings } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();

  const currentMeeting = meetings[0];

  if (!currentMeeting) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold">Current Meeting</h1>
        <p className="mt-4">No meetings are available.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <MeetingDetail meeting={currentMeeting} />
    </main>
  );
}