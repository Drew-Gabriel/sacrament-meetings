'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  createMeeting as createMeetingRecord,
  updateMeeting as updateMeetingRecord,
  deleteMeeting as deleteMeetingRecord,
  type MeetingInput,
} from '@/lib/meetings-db';

const MeetingFormSchema = z.object({
  date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Please enter a valid date.',
    ),

  meetingType: z.enum([
    'testimony',
    'regular',
    'stake',
    'general',
    'special',
  ]),

  presiding: z
    .string()
    .trim()
    .min(2, 'Presiding name is required.'),

  conducting: z
    .string()
    .trim()
    .min(2, 'Conducting name is required.'),

  announcements: z.string().optional(),

  openingHymnNumber: z
    .string()
    .regex(/^\d+$/, 'Enter a valid hymn number.'),

  openingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Opening hymn title is required.'),

  openingPrayer: z
    .string()
    .trim()
    .min(2, 'Opening prayer is required.'),

  wardBusiness: z.string().optional(),

  stakeBusiness: z.enum(['true', 'false']),

  sacramentHymnNumber: z
    .string()
    .regex(/^\d+$/, 'Enter a valid hymn number.'),

  sacramentHymnTitle: z
    .string()
    .trim()
    .min(1, 'Sacrament hymn title is required.'),

  speakers: z.string().optional(),

  closingHymnNumber: z
    .string()
    .regex(/^\d+$/, 'Enter a valid hymn number.'),

  closingHymnTitle: z
    .string()
    .trim()
    .min(1, 'Closing hymn title is required.'),

  closingPrayer: z
    .string()
    .trim()
    .min(2, 'Closing prayer is required.'),
});

export type State = {
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

function getLines(value: string | undefined): string[] {
  return (value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseSpeakers(value: string | undefined) {
  return getLines(value).map((line) => {
    const parts = line
      .split('|')
      .map((part) => part.trim());

    return {
      name: parts[0] ?? '',
      topic: parts[1] ?? '',
      type:
        parts[2] === 'musical-number'
          ? ('musical-number' as const)
          : ('speaker' as const),
    };
  });
}

function buildMeeting(
  data: z.infer<typeof MeetingFormSchema>,
): MeetingInput {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,

    announcements: getLines(data.announcements),

    openingHymn: {
      number: Number(data.openingHymnNumber),
      title: data.openingHymnTitle,
    },

    openingPrayer: data.openingPrayer,

    wardBusiness: getLines(data.wardBusiness).map(
      (description) => ({
        description,
      }),
    ),

    stakeBusiness: data.stakeBusiness === 'true',

    sacramentHymn: {
      number: Number(data.sacramentHymnNumber),
      title: data.sacramentHymnTitle,
    },

    speakers: parseSpeakers(data.speakers),

    closingHymn: {
      number: Number(data.closingHymnNumber),
      title: data.closingHymnTitle,
    },

    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  _previousState: State,
  formData: FormData,
): Promise<State> {
  const rawData = Object.fromEntries(
    formData.entries(),
  );

  const validatedFields =
    MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  try {
    const meeting = buildMeeting(
      validatedFields.data,
    );

    await createMeetingRecord(meeting);
  } catch (error) {
    console.error(
      'Failed to create meeting:',
      error,
    );

    throw new Error(
      'Unable to create the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _previousState: State,
  formData: FormData,
): Promise<State> {
  const rawData = Object.fromEntries(
    formData.entries(),
  );

  const validatedFields =
    MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors:
        validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  try {
    const meeting = buildMeeting(
      validatedFields.data,
    );

    const updatedMeeting =
      await updateMeetingRecord(id, meeting);

    if (!updatedMeeting) {
      throw new Error('Meeting not found.');
    }
  } catch (error) {
    console.error(
      'Failed to update meeting:',
      error,
    );

    throw new Error(
      'Unable to update the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);

  redirect('/meetings');
}

export async function deleteMeeting(
  id: number,
  formData: FormData,
): Promise<void> {
  void formData;

  try {
    await deleteMeetingRecord(id);
  } catch (error) {
    console.error(
      'Failed to delete meeting:',
      error,
    );

    throw new Error(
      'Unable to delete the meeting. Please try again.',
    );
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}