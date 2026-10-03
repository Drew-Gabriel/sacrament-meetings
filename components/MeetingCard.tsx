import Link from 'next/link';

import { deleteMeeting } from '@/lib/actions';
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

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/meetings/${meeting.id}`}
            className="rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700"
          >
            View Meeting
          </Link>

          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Edit
          </Link>

          <form action={deleteMeeting.bind(null, meeting.id)}>
            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">
            Presiding:
          </span>{' '}
          {meeting.presiding}
        </p>

        <p className="mt-1">
          <span className="font-semibold">
            Conducting:
          </span>{' '}
          {meeting.conducting}
        </p>
      </div>
    </article>
  );
}