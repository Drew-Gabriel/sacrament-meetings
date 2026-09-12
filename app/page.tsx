import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Sacrament Meeting Planner
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Plan and view sacrament meetings with ease.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">
          View current and past meeting programs, including hymns,
          prayers, speakers, announcements, and ward business.
        </p>

        <div className="mt-8">
          <Link
            href="/meetings"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View Meetings
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white p-4 shadow-sm">
        <Image
          src="/sacrament-meeting.svg"
          alt="Sacrament meeting program illustration"
          width={800}
          height={500}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}