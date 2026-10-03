import Link from 'next/link';

import { getMeetingsPaginated } from '@/lib/meetings-db';
import MeetingCard from '@/components/MeetingCard';

type MeetingsPageProps = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const search = params.search ?? '';
  const requestedPage = Number(params.page ?? '1');

  const page =
    Number.isFinite(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const {
    meetings,
    totalCount,
    totalPages,
    currentPage,
  } = await getMeetingsPaginated(search, page, 6);

  const createPageUrl = (pageNumber: number) => {
    const query = new URLSearchParams();

    if (search) {
      query.set('search', search);
    }

    query.set('page', String(pageNumber));

    return `/meetings?${query.toString()}`;
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">
          Sacrament Meetings
        </h1>

        <Link
          href="/meetings/new"
          className="rounded-md bg-green-600 px-5 py-2 text-center font-semibold text-white hover:bg-green-700"
        >
          Create New Meeting
        </Link>
      </div>

      <form
        action="/meetings"
        method="GET"
        className="mb-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          type="search"
          name="search"
          defaultValue={search}
          placeholder="Search meetings..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Search
        </button>

        {search && (
          <Link
            href="/meetings"
            className="rounded-md border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
          >
            Clear
          </Link>
        )}
      </form>

      {search && (
        <p className="mb-6 text-sm text-gray-600">
          Search results for: <strong>{search}</strong>
        </p>
      )}

      <p className="mb-4 text-sm text-gray-600">
        Showing {meetings.length} of {totalCount} meetings
      </p>

      {meetings.length === 0 ? (
        <p className="rounded-md border border-gray-200 bg-gray-50 p-6 text-gray-600">
          No meetings found.
        </p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-8 flex items-center justify-center gap-4"
              aria-label="Meeting pagination"
            >
              {currentPage > 1 ? (
                <Link
                  href={createPageUrl(currentPage - 1)}
                  className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Previous
                </Link>
              ) : (
                <span className="rounded-md border border-gray-200 px-4 py-2 text-gray-400">
                  Previous
                </span>
              )}

              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link
                  href={createPageUrl(currentPage + 1)}
                  className="rounded-md border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Next
                </Link>
              ) : (
                <span className="rounded-md border border-gray-200 px-4 py-2 text-gray-400">
                  Next
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}