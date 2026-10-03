import { notFound } from 'next/navigation';

import MeetingForm from '@/components/MeetingForm';
import { getMeetingById } from '@/lib/meetings-db';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Edit Meeting
      </h1>

      <p className="mt-2 text-gray-600">
        Update the information for this sacrament meeting.
      </p>

      <div className="mt-8">
        <MeetingForm meeting={meeting} />
      </div>
    </main>
  );
}