import { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'testimony',
    presiding: 'Bishop John Smith',
    conducting: 'Brother David Brown',
    announcements: [
      'Youth activity will be held on Wednesday.',
      'Please remember the upcoming service project.',
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God',
    },
    openingPrayer: 'Sister Mary Johnson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'As Now We Take the Sacrament',
    },
    speakers: [
      {
        name: 'Ward Members',
        topic: 'Testimonies',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 30,
      title: 'Come, Come, Ye Saints',
    },
    closingPrayer: 'Brother Michael Davis',
  },

  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'regular',
    presiding: 'Bishop John Smith',
    conducting: 'Sister Sarah Wilson',
    announcements: [
      'Relief Society activity is scheduled for Thursday.',
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation',
    },
    openingPrayer: 'Brother James Taylor',
    wardBusiness: [
      {
        description: 'Sustaining of new ward organization leaders.',
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 172,
      title: 'In Humility, Our Savior',
    },
    speakers: [
      {
        name: 'Sister Emily Brown',
        topic: 'Faith in Jesus Christ',
        type: 'speaker',
      },
      {
        name: 'Brother Daniel Smith',
        topic: 'Serving Others',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much',
    },
    closingPrayer: 'Sister Rachel Davis',
  },

  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'stake',
    presiding: 'President Robert Anderson',
    conducting: 'Brother Thomas Clark',
    announcements: [
      'Stake conference will begin next month.',
    ],
    openingHymn: {
      number: 89,
      title: 'The Lord Is My Light',
    },
    openingPrayer: 'Sister Linda Moore',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 185,
      title: 'Reverently and Meekly Now',
    },
    speakers: [
      {
        name: 'President Robert Anderson',
        topic: 'Strengthening Our Families',
        type: 'speaker',
      },
      {
        name: 'Sister Jennifer Lee',
        topic: 'Following the Savior',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 152,
      title: 'God Be with You Till We Meet Again',
    },
    closingPrayer: 'Brother William Harris',
  },

  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'general',
    presiding: 'Bishop John Smith',
    conducting: 'Brother David Brown',
    announcements: [],
    openingHymn: {
      number: 66,
      title: 'Rejoice, the Lord Is King!',
    },
    openingPrayer: 'Sister Mary Johnson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 174,
      title: 'While of These Emblems We Partake',
    },
    speakers: [
      {
        name: 'Elder Michael Green',
        topic: 'Faith and Hope',
        type: 'speaker',
      },
      {
        name: 'Sister Anna White',
        topic: 'The Love of God',
        type: 'speaker',
      },
      {
        name: 'Brother Samuel King',
        topic: 'Living the Gospel',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 85,
      title: 'How Firm a Foundation',
    },
    closingPrayer: 'Brother James Taylor',
  },

  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop John Smith',
    conducting: 'Sister Sarah Wilson',
    announcements: [
      'Temple preparation class will meet this week.',
      'Ward choir practice is on Friday evening.',
    ],
    openingHymn: {
      number: 96,
      title: 'Dearest Children, God Is Near You',
    },
    openingPrayer: 'Brother Daniel Smith',
    wardBusiness: [
      {
        description: 'Announcement of the upcoming ward service project.',
      },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 185,
      title: 'Reverently and Meekly Now',
    },
    speakers: [
      {
        name: 'Sister Rachel Davis',
        topic: 'Keeping the Sabbath Day Holy',
        type: 'speaker',
      },
      {
        name: 'Brother Michael Davis',
        topic: 'Building Strong Families',
        type: 'speaker',
      },
    ],
    closingHymn: {
      number: 223,
      title: 'Have I Done Any Good?',
    },
    closingPrayer: 'Sister Emily Brown',
  },
];

export function getMeetings(): SacramentMeeting[] {
  return meetings;
}

export function getMeetingById(
  id: number,
): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getMeetingByDate(
  date: string,
): SacramentMeeting[] {
  return meetings.filter((meeting) => meeting.date === date);
}