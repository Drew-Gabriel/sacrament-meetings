import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const meetings = [
  {
    date: "2026-05-03",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Youth activity this Saturday at 10:00 AM."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Michael Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Sister Emily Smith", topic: "Personal Testimony", type: "speaker" },
      { name: "Brother David Brown", topic: "Faith in Jesus Christ", type: "speaker" }
    ],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Sister Sarah Wilson"
  },
  {
    date: "2026-05-10",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Sister Sarah Wilson",
    announcements: ["Ward choir practice will be Wednesday evening."],
    openingHymn: { number: 85, title: "How Firm a Foundation" },
    openingPrayer: "Brother James Anderson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [
      { name: "Brother David Brown", topic: "Following the Savior", type: "speaker" },
      { name: "Sister Mary Johnson", topic: "Serving Others", type: "speaker" }
    ],
    closingHymn: { number: 227, title: "Improve the Shining Moments" },
    closingPrayer: "Brother Michael Johnson"
  },
  {
    date: "2026-05-17",
    meetingType: "stake",
    presiding: "President Robert Williams",
    conducting: "Brother Daniel Clark",
    announcements: [],
    openingHymn: { number: 81, title: "Press Forward, Saints" },
    openingPrayer: "Sister Linda Brown",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "President Robert Williams", topic: "Strengthening Families", type: "speaker" },
      { name: "Sister Linda Brown", topic: "Faith and Service", type: "speaker" }
    ],
    closingHymn: { number: 219, title: "Because I Have Been Given Much" },
    closingPrayer: "Brother Daniel Clark"
  },
  {
    date: "2026-05-24",
    meetingType: "general",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: [],
    openingHymn: { number: 66, title: "Rejoice, the Lord Is King!" },
    openingPrayer: "Sister Emily Smith",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Brother James Anderson", topic: "The Gospel of Jesus Christ", type: "speaker" },
      { name: "Sister Sarah Wilson", topic: "Hope Through the Savior", type: "speaker" }
    ],
    closingHymn: { number: 227, title: "Improve the Shining Moments" },
    closingPrayer: "Brother Michael Johnson"
  },
  {
    date: "2026-05-31",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Sister Sarah Wilson",
    announcements: ["Temple recommend interviews are available this week."],
    openingHymn: { number: 5, title: "High on the Mountain Top" },
    openingPrayer: "Brother Daniel Clark",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "Sister Mary Johnson", topic: "Gratitude", type: "speaker" },
      { name: "Brother James Anderson", topic: "Keeping the Sabbath Day Holy", type: "speaker" }
    ],
    closingHymn: { number: 30, title: "Come, Come, Ye Saints" },
    closingPrayer: "Sister Linda Brown"
  },
  {
    date: "2026-06-07",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother James Anderson",
    announcements: [],
    openingHymn: { number: 23, title: "We Love Thy House, O God" },
    openingPrayer: "Sister Mary Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: "I Stand All Amazed" },
    speakers: [
      { name: "Sister Emily Smith", topic: "My Testimony of the Savior", type: "speaker" },
      { name: "Brother Daniel Clark", topic: "The Power of Prayer", type: "speaker" }
    ],
    closingHymn: { number: 85, title: "How Firm a Foundation" },
    closingPrayer: "Brother David Brown"
  },
  {
    date: "2026-06-14",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Sister Sarah Wilson",
    announcements: ["Relief Society activity is scheduled for Thursday."],
    openingHymn: { number: 2, title: "The Spirit of God" },
    openingPrayer: "Brother Michael Johnson",
    wardBusiness: [
      { description: "Sustaining of new ward activity committee members." }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: "There Is a Green Hill Far Away" },
    speakers: [
      { name: "Brother David Brown", topic: "Living the Gospel Daily", type: "speaker" },
      { name: "Sister Linda Brown", topic: "Finding Peace Through Christ", type: "speaker" }
    ],
    closingHymn: { number: 219, title: "Because I Have Been Given Much" },
    closingPrayer: "Sister Emily Smith"
  },
  {
    date: "2026-06-21",
    meetingType: "stake",
    presiding: "President Robert Williams",
    conducting: "Brother Daniel Clark",
    announcements: ["Stake conference preparation meeting next Sunday."],
    openingHymn: { number: 81, title: "Press Forward, Saints" },
    openingPrayer: "Brother James Anderson",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 169, title: "As Now We Take the Sacrament" },
    speakers: [
      { name: "President Robert Williams", topic: "Serving in the Church", type: "speaker" },
      { name: "Sister Sarah Wilson", topic: "Building Stronger Families", type: "speaker" }
    ],
    closingHymn: { number: 66, title: "Rejoice, the Lord Is King!" },
    closingPrayer: "Sister Mary Johnson"
  }
];

for (const meeting of meetings) {
  await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    ON CONFLICT (date) DO NOTHING;
  `;
}

console.log("8 meetings inserted successfully!");
