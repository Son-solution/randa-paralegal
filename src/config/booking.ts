/**
 * Appointment and intake settings.
 *
 * IMPORTANT: The opening hours below are ASSUMPTIONS that Randa Kale has not
 * confirmed yet. They only drive the demo calendar and are not published as
 * opening hours anywhere on the website. Adjust them here once confirmed.
 */
export const booking = {
  timezone: "Europe/Zurich",
  /** Length of the first consultation in minutes. */
  durationMinutes: 45,
  /** Pause between two appointments in minutes. */
  bufferMinutes: 15,
  /**
   * ASSUMED working hours per weekday (1 = Monday … 5 = Friday).
   * [first start hour, last start hour] – with 45 + 15 minutes, a start every full hour.
   * Mo–Do 09.00–17.00, Fr 09.00–16.00, Sa/So closed.
   */
  hours: {
    1: [9, 16],
    2: [9, 16],
    3: [9, 16],
    4: [9, 16],
    5: [9, 15],
  } as Record<number, [number, number]>,
  /** How far ahead appointments can be chosen (days). */
  horizonDays: 42,
  /** Minimum notice before an appointment (hours). */
  minNoticeHours: 24,
} as const;

/** Upload rules for the (demo) document step. Files are never uploaded in demo mode. */
export const uploads = {
  maxFiles: 10,
  maxBytes: 10 * 1024 * 1024,
  extensions: ["pdf", "jpg", "jpeg", "png", "heic", "heif"],
  accept:
    ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif",
} as const;

/**
 * Proposed data-retention values for the future backend (documentation only –
 * nothing is stored in demo mode). Must be confirmed before production.
 */
export const retentionProposal = {
  resumeLinkTtlDays: 14,
  draftRetentionDays: 30,
  draftFileRetentionDays: 30,
  requestRetentionDays: null as number | null,
  requestFileRetentionDays: null as number | null,
};
