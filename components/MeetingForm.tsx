'use client';

import { useActionState } from 'react';

import {
  createMeeting,
  updateMeeting,
  type State,
} from '@/lib/actions';

import type { SacramentMeeting } from '@/lib/types';

type MeetingFormProps = {
  meeting?: SacramentMeeting;
};

const initialState: State = {
  errors: {},
  message: null,
};

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div
      id={id}
      aria-live="polite"
      className="mt-1 text-sm text-red-600"
    >
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({
  meeting,
}: MeetingFormProps) {
  const isEditing = Boolean(meeting);

  const action = meeting
    ? updateMeeting.bind(null, meeting.id)
    : createMeeting;

  const [state, formAction, isPending] =
    useActionState<State, FormData>(
      action,
      initialState,
    );

  const errors = state.errors ?? {};

  const announcements =
    meeting?.announcements?.join('\n') ?? '';

  const wardBusiness =
    meeting?.wardBusiness
      ?.map((item) => item.description)
      .join('\n') ?? '';

  const speakers =
    meeting?.speakers
      ?.map(
        (speaker) =>
          `${speaker.name} | ${speaker.topic} | ${speaker.type}`,
      )
      .join('\n') ?? '';

  return (
    <form
      action={formAction}
      className="space-y-8"
    >
      {state.message && (
        <div
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {state.message}
        </div>
      )}

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Meeting Information
        </h2>

        <div>
          <label
            htmlFor="date"
            className="block font-semibold"
          >
            Date
          </label>

          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting?.date ?? ''}
            aria-describedby="date-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />

          <FieldError
            id="date-error"
            errors={errors.date}
          />
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="block font-semibold"
          >
            Meeting Type
          </label>

          <select
            id="meetingType"
            name="meetingType"
            defaultValue={
              meeting?.meetingType ?? 'regular'
            }
            aria-describedby="meetingType-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
            <option value="special">Special</option>
          </select>

          <FieldError
            id="meetingType-error"
            errors={errors.meetingType}
          />
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="block font-semibold"
          >
            Presiding
          </label>

          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />

          <FieldError
            id="presiding-error"
            errors={errors.presiding}
          />
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="block font-semibold"
          >
            Conducting
          </label>

          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />

          <FieldError
            id="conducting-error"
            errors={errors.conducting}
          />
        </div>

        <div>
          <label
            htmlFor="announcements"
            className="block font-semibold"
          >
            Announcements
          </label>

          <textarea
            id="announcements"
            name="announcements"
            rows={4}
            defaultValue={announcements}
            aria-describedby="announcements-error"
            placeholder="One announcement per line"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />

          <FieldError
            id="announcements-error"
            errors={errors.announcements}
          />
        </div>
      </section>

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Opening
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block font-semibold"
            >
              Opening Hymn Number
            </label>

            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue={
                meeting?.openingHymn.number ?? ''
              }
              aria-describedby="openingHymnNumber-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="openingHymnNumber-error"
              errors={errors.openingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block font-semibold"
            >
              Opening Hymn Title
            </label>

            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              defaultValue={
                meeting?.openingHymn.title ?? ''
              }
              aria-describedby="openingHymnTitle-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="openingHymnTitle-error"
              errors={errors.openingHymnTitle}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="openingPrayer"
            className="block font-semibold"
          >
            Opening Prayer
          </label>

          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={meeting?.openingPrayer ?? ''}
            aria-describedby="openingPrayer-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />

          <FieldError
            id="openingPrayer-error"
            errors={errors.openingPrayer}
          />
        </div>
      </section>

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Ward Business
        </h2>

        <div>
          <label
            htmlFor="wardBusiness"
            className="block font-semibold"
          >
            Ward Business Items
          </label>

          <textarea
            id="wardBusiness"
            name="wardBusiness"
            rows={4}
            defaultValue={wardBusiness}
            aria-describedby="wardBusiness-error"
            placeholder="One business item per line"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />

          <FieldError
            id="wardBusiness-error"
            errors={errors.wardBusiness}
          />
        </div>

        <div>
          <label
            htmlFor="stakeBusiness"
            className="block font-semibold"
          >
            Stake Business
          </label>

          <select
            id="stakeBusiness"
            name="stakeBusiness"
            defaultValue={
              meeting?.stakeBusiness
                ? 'true'
                : 'false'
            }
            aria-describedby="stakeBusiness-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <FieldError
            id="stakeBusiness-error"
            errors={errors.stakeBusiness}
          />
        </div>
      </section>

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Sacrament
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block font-semibold"
            >
              Sacrament Hymn Number
            </label>

            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue={
                meeting?.sacramentHymn.number ?? ''
              }
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="sacramentHymnNumber-error"
              errors={errors.sacramentHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block font-semibold"
            >
              Sacrament Hymn Title
            </label>

            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              defaultValue={
                meeting?.sacramentHymn.title ?? ''
              }
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="sacramentHymnTitle-error"
              errors={errors.sacramentHymnTitle}
            />
          </div>
        </div>
      </section>

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Speakers
        </h2>

        <div>
          <label
            htmlFor="speakers"
            className="block font-semibold"
          >
            Speakers and Musical Numbers
          </label>

          <p className="mt-1 text-sm text-gray-600">
            Enter one per line using:
            <br />
            Name | Topic | speaker
            <br />
            Name | Topic | musical-number
          </p>

          <textarea
            id="speakers"
            name="speakers"
            rows={6}
            defaultValue={speakers}
            aria-describedby="speakers-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
          />

          <FieldError
            id="speakers-error"
            errors={errors.speakers}
          />
        </div>
      </section>

      <section className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">
          Closing
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block font-semibold"
            >
              Closing Hymn Number
            </label>

            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue={
                meeting?.closingHymn.number ?? ''
              }
              aria-describedby="closingHymnNumber-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="closingHymnNumber-error"
              errors={errors.closingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block font-semibold"
            >
              Closing Hymn Title
            </label>

            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={
                meeting?.closingHymn.title ?? ''
              }
              aria-describedby="closingHymnTitle-error"
              className="mt-1 w-full rounded-md border px-3 py-2"
              required
            />

            <FieldError
              id="closingHymnTitle-error"
              errors={errors.closingHymnTitle}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="block font-semibold"
          >
            Closing Prayer
          </label>

          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={meeting?.closingPrayer ?? ''}
            aria-describedby="closingPrayer-error"
            className="mt-1 w-full rounded-md border px-3 py-2"
            required
          />

          <FieldError
            id="closingPrayer-error"
            errors={errors.closingPrayer}
          />
        </div>
      </section>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending
          ? 'Saving...'
          : isEditing
            ? 'Update Meeting'
            : 'Create Meeting'}
      </button>
    </form>
  );
}