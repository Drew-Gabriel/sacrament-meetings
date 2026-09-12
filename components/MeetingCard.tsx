import Link from 'next/link';
import { SacramentMeeting } from '@/lib/types';

type MeetingCardProps = {
  meeting: SacramentMeeting;
};

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`,
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase text-blue-600">
            {meeting.meetingType} meeting
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {formattedDate}
          </h2>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
        >
          View Meeting
        </Link>
      </div>

      <div className="mt-4 border-t pt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Presiding:</span>{' '}
          {meeting.presiding}
        </p>

        <p className="mt-1">
          <span className="font-semibold">Conducting:</span>{' '}
          {meeting.conducting}
        </p>
      </div>
    </article>
  );
}