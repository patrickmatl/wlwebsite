import { PROJECT_STATUSES } from '@/lib/crm/types';
import type { ProjectStatus } from '@/lib/crm/types';

/**
 * Small formatting helpers used across the portal.
 *
 * Money and dates come from the shared CRM helpers; only the things those do
 * not cover live here.
 */

/**
 * A search param is `string | string[] | undefined` in the App Router. Every
 * param the portal reads is single-valued, so a repeated one is a malformed
 * URL rather than a case to honour — take the first and move on.
 */
export function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** File sizes as a person reads them, not as the database stores them. */
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) return '';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['kB', 'MB', 'GB', 'TB'];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 10 || unit === 0 ? 0 : 1)} ${units[unit]}`;
}

/**
 * Studio-written prose (a quote intro, terms, invoice notes) arrives as plain
 * text with line breaks. Splitting on blank lines keeps the author's
 * paragraphing without letting any markup they typed reach the DOM.
 */
export function paragraphs(text: string | null | undefined): string[] {
  if (!text) return [];
  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
}

/** First name, for greetings. Falls back to something that still reads well. */
export function firstName(fullName: string): string {
  const part = fullName.trim().split(/\s+/)[0];
  return part || 'there';
}

/** True when a date has already passed. Used for validity and due dates. */
export function isPast(value: string | null | undefined): boolean {
  if (!value) return false;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return false;
  return time < Date.now();
}

/** "in 5 days" / "3 days ago" — for due dates, where the direction matters. */
export function dueLanguage(value: string | null | undefined): string | null {
  if (!value) return null;
  const time = Date.parse(value);
  if (Number.isNaN(time)) return null;

  const days = Math.round((time - Date.now()) / 86_400_000);
  if (days === 0) return 'due today';
  if (days === 1) return 'due tomorrow';
  if (days > 1) return `due in ${days} days`;
  if (days === -1) return '1 day overdue';
  return `${Math.abs(days)} days overdue`;
}

/**
 * Whether a project has come to rest — delivered or cancelled.
 *
 * Read from PROJECT_STATUSES rather than a literal list, so adding a terminal
 * status to the CRM does not silently leave it filed under "active" here.
 */
export function isProjectClosed(status: ProjectStatus): boolean {
  return PROJECT_STATUSES.find((entry) => entry.id === status)?.done ?? false;
}
