export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          View current and past sacrament meeting programs.
        </p>
      </div>

      {children}
    </section>
  );
}