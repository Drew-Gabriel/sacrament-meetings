import { SacramentMeeting } from '@/lib/types';

type MeetingDetailProps = {
  meeting: SacramentMeeting;
};

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`,
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="rounded-lg bg-white p-6 shadow-sm">
      <header className="border-b pb-6">
        <p className="text-sm font-semibold uppercase text-blue-600">
          {meeting.meetingType} meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">
          {formattedDate}
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Presiding:</span>{' '}
            {meeting.presiding}
          </p>

          <p>
            <span className="font-semibold">Conducting:</span>{' '}
            {meeting.conducting}
          </p>
        </div>
      </header>

      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section className="border-b py-6">
            <h2 className="text-xl font-bold">
              Announcements
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

      <section className="border-b py-6">
        <h2 className="text-xl font-bold">
          Opening
        </h2>

        <div className="mt-4 space-y-3">
          <p>
            <span className="font-semibold">Opening Hymn:</span>{' '}
            #{meeting.openingHymn.number} —{' '}
            {meeting.openingHymn.title}
          </p>

          <p>
            <span className="font-semibold">Opening Prayer:</span>{' '}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section className="border-b py-6">
          <h2 className="text-xl font-bold">
            Ward Business
          </h2>

          <ul className="mt-3 list-disc space-y-2 pl-5">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section className="border-b py-6">
          <h2 className="text-xl font-bold">
            Stake Business
          </h2>

          <p className="mt-3">
            Stake business will be conducted during this meeting.
          </p>
        </section>
      )}

      <section className="border-b py-6">
        <h2 className="text-xl font-bold">
          Sacrament
        </h2>

        <p className="mt-3">
          <span className="font-semibold">Sacrament Hymn:</span>{' '}
          #{meeting.sacramentHymn.number} —{' '}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="border-b py-6">
        <h2 className="text-xl font-bold">
          Speakers and Musical Numbers
        </h2>

        <div className="mt-4 space-y-4">
          {meeting.speakers.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-md bg-gray-50 p-4"
            >
              <p className="font-semibold">
                {item.name}
              </p>

              <p className="text-gray-600">
                {item.topic}
              </p>

              <p className="mt-1 text-sm capitalize text-blue-600">
                {item.type.replace('-', ' ')}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-6">
        <h2 className="text-xl font-bold">
          Closing
        </h2>

        <div className="mt-4 space-y-3">
          <p>
            <span className="font-semibold">Closing Hymn:</span>{' '}
            #{meeting.closingHymn.number} —{' '}
            {meeting.closingHymn.title}
          </p>

          <p>
            <span className="font-semibold">Closing Prayer:</span>{' '}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>
    </article>
  );
}