import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS meetings (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    meeting_type VARCHAR(20) CHECK (meeting_type IN ('testimony', 'regular', 'stake', 'general', 'special')),
    presiding TEXT,
    conducting TEXT,
    announcements TEXT[],
    opening_hymn JSONB,
    opening_prayer TEXT,
    ward_business JSONB,
    stake_business BOOLEAN,
    sacrament_hymn JSONB,
    speakers JSONB,
    closing_hymn JSONB,
    closing_prayer TEXT
  );
`;

console.log("? Meetings table created successfully!");
