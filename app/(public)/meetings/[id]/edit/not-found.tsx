import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Meeting Not Found
      </h1>

      <p className="mt-4 text-gray-600">
        The meeting you are trying to edit does not exist.
      </p>

      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        Back to Meetings
      </Link>
    </main>
  );
}