import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT id, date
  FROM meetings
  ORDER BY date DESC
`;

console.log(rows);
