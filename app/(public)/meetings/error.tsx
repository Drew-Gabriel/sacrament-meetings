'use client';

import Link from 'next/link';

export default function MeetingsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600">
        We could not load the meetings right now. Please try
        again.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}