import { getMeetingById } from '@/lib/meetings-db';
import MeetingDetail from '@/components/MeetingDetail';

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold">Meeting Not Found</h1>
        <p className="mt-4">
          The meeting you are looking for does not exist.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}