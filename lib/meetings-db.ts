import { sql } from './db';
import { SacramentMeeting } from './types';

type MeetingRow = {
  id: number;
  date: string | Date;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting['openingHymn'];
  opening_prayer: string;
  ward_business: SacramentMeeting['wardBusiness'];
  stake_business: boolean;
  sacrament_hymn: SacramentMeeting['sacramentHymn'];
  speakers: SacramentMeeting['speakers'];
  closing_hymn: SacramentMeeting['closingHymn'];
  closing_prayer: string;
};

function formatDatabaseDate(date: string | Date): string {
  if (typeof date === 'string') {
    return date.slice(0, 10);
  }

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate() + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: formatDatabaseDate(row.date),
    meetingType: row.meeting_type as SacramentMeeting['meetingType'],
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  search?: string,
): Promise<SacramentMeeting[]> {
  const searchTerm = search?.trim();

  if (searchTerm) {
    const searchPattern = `%${searchTerm}%`;

    const rows = await sql`
      SELECT *
      FROM meetings
      WHERE
        meeting_type ILIKE ${searchPattern}
        OR presiding ILIKE ${searchPattern}
        OR conducting ILIKE ${searchPattern}
        OR date::text ILIKE ${searchPattern}
      ORDER BY date DESC
    `;

    return rows.map((row) => mapMeeting(row as MeetingRow));
  }

  const rows = await sql`
    SELECT *
    FROM meetings
    ORDER BY date DESC
  `;

  return rows.map((row) => mapMeeting(row as MeetingRow));
}

export async function getMeetingsPaginated(
  search = '',
  page = 1,
  pageSize = 6,
): Promise<{
  meetings: SacramentMeeting[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, pageSize);
  const searchTerm = search.trim();
  const searchPattern = `%${searchTerm}%`;

  const countRows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      ${searchTerm} = ''
      OR meeting_type ILIKE ${searchPattern}
      OR presiding ILIKE ${searchPattern}
      OR conducting ILIKE ${searchPattern}
      OR date::text ILIKE ${searchPattern}
  `;

  const totalCount = Number(countRows[0]?.count ?? 0);
  const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));

  const currentPage = Math.min(safePage, totalPages);
  const currentOffset = (currentPage - 1) * safePageSize;

  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE
      ${searchTerm} = ''
      OR meeting_type ILIKE ${searchPattern}
      OR presiding ILIKE ${searchPattern}
      OR conducting ILIKE ${searchPattern}
      OR date::text ILIKE ${searchPattern}
    ORDER BY date DESC
    LIMIT ${safePageSize}
    OFFSET ${currentOffset}
  `;

  return {
    meetings: rows.map((row) => mapMeeting(row as MeetingRow)),
    totalCount,
    totalPages,
    currentPage,
  };
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return undefined;
  }

  return mapMeeting(rows[0] as MeetingRow);
}

export async function getMeetingByDate(
  date: string,
): Promise<SacramentMeeting[]> {
  const rows = await sql`
    SELECT *
    FROM meetings
    WHERE date = ${date}
    ORDER BY date DESC
  `;

  return rows.map((row) => mapMeeting(row as MeetingRow));
}