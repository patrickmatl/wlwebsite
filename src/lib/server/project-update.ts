import { BUSINESS } from '@/data/business';
import { contactName } from '@/lib/crm/types';
import { db } from './db';
import { sendEmail } from './notify';
import { tagSubject } from './threads';
import { threadIdForContact } from './messages';
import { signatureHtml, signatureText } from './email-signature';
import { greetingName } from './render-quote';
import * as crm from './crm';

/**
 * Telling a client where their project has got to.
 *
 * The studio could already move a project through its stages, but only the
 * studio ever saw that happen. A client who had paid a deposit heard nothing
 * between "thanks, we are booked" and the finished artwork landing, and the
 * portal — which does show the stages — is no use to someone who has no reason
 * to open it. Silence is what makes a client start wondering whether anything
 * is happening at all.
 *
 * So an update does three things at once, and all three matter:
 *
 *   1. It emails the client, because that is where they are. The message is
 *      whatever the studio typed — no template, no filler around it.
 *   2. It lands on the project timeline, so the studio can see what the client
 *      has been told and when, without going through a sent folder.
 *   3. It shows in the portal under the project, so the whole story is in one
 *      place if they go looking.
 *
 * Optionally it also completes a milestone, which is the honest way to move the
 * stepper: the client is told at the same moment the progress moves, rather
 * than the bar creeping forward silently.
 */

const GOLD = '#B8860B';
const INK = '#111111';

export type ProjectUpdateResult = {
  emailed: boolean;
  to: string | null;
  milestoneCompleted: string | null;
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** The studio's words, with blank lines kept as paragraph breaks. */
function paragraphs(message: string): string {
  return message
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(
      (p) =>
        `<p style="margin:0 0 14px 0;font-size:15px;line-height:23px;color:${INK};">${esc(p).replace(/\n/g, '<br />')}</p>`,
    )
    .join('');
}

export async function sendProjectUpdate(
  input: { projectId: string; message: string; completeMilestoneId?: string | null },
  actor = 'studio',
): Promise<ProjectUpdateResult> {
  const message = input.message?.trim();
  if (!message) throw new Error('an update needs something to say');

  const full = await crm.getProjectFull(input.projectId);
  if (!full) throw new Error(`project ${input.projectId} not found`);

  const { project, contact } = full;

  /**
   * Complete the milestone first.
   *
   * If this throws, nothing has been sent and nothing has been claimed. Doing
   * it after the email would risk telling a client a stage is finished while
   * the stepper still says otherwise.
   */
  let milestoneCompleted: string | null = null;
  if (input.completeMilestoneId) {
    const done = await crm.updateMilestone(input.completeMilestoneId, { status: 'done' }, actor);
    milestoneCompleted = done.title;
  }

  /**
   * An update is an email to the client like any other, so it belongs in their
   * conversation. Without this the studio's Messages page would show a thread
   * that is missing the most recent thing anybody said in it — which is worse
   * than no thread at all, because it reads as complete.
   *
   * Tagging the subject with the thread reference also means their reply comes
   * back to that conversation instead of opening a second one about the same
   * job.
   */
  const threadId = contact ? await threadIdForContact(contact.id).catch(() => null) : null;
  let threadRef: string | null = null;
  if (threadId) {
    const { data } = await db()
      .from('quote_threads')
      .select('ref')
      .eq('id', threadId)
      .maybeSingle();
    threadRef = (data as { ref: string | null } | null)?.ref ?? null;
  }

  const to = contact?.email?.trim() || null;
  const name = contact ? greetingName(contactName(contact)) : 'there';
  const projectLabel = project.name || project.code || 'your project';
  const portalUrl = `${BUSINESS.url}/portal/projects/${project.id}`;

  let emailed = false;
  if (to) {
    const text = [
      `Hi ${name}`,
      '',
      message,
      ...(milestoneCompleted ? ['', `That means "${milestoneCompleted}" is now done.`] : []),
      '',
      'You can see where the project stands at any time here:',
      portalUrl,
      '',
      signatureText(),
    ].join('\n');

    const html =
      `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;">` +
      `<p style="margin:0 0 14px 0;font-size:15px;line-height:23px;color:${INK};">Hi ${esc(name)}</p>` +
      paragraphs(message) +
      (milestoneCompleted
        ? `<p style="margin:0 0 14px 0;font-size:15px;line-height:23px;color:${INK};">That means <strong>${esc(milestoneCompleted)}</strong> is now done.</p>`
        : '') +
      `<p style="margin:18px 0 6px 0;font-size:13px;line-height:20px;color:#5A5A5A;">` +
      `You can see where <strong>${esc(projectLabel)}</strong> stands at any time in your portal:` +
      `</p>` +
      `<p style="margin:0 0 20px 0;"><a href="${esc(portalUrl)}" style="color:${GOLD};font-size:13px;">${esc(portalUrl)}</a></p>` +
      signatureHtml() +
      `</div>`;

    const subject = tagSubject(`Update on ${projectLabel}`, threadRef);
    await sendEmail({ to, subject, text, html });
    emailed = true;

    if (threadId) {
      // Recorded as a sent studio message, the same shape an approved draft
      // leaves behind, so the conversation cannot tell them apart.
      await db()
        .from('quote_messages')
        .insert({
          thread_id: threadId,
          role: 'studio',
          subject,
          body: message,
          sent_at: new Date().toISOString(),
          approved_by: actor,
        })
        .then(undefined, (err) => console.error('[project-update] not threaded', err));

      await db()
        .from('quote_threads')
        .update({ state: 'awaiting_client', follow_ups_sent: 0 })
        .eq('id', threadId);
    }
  }

  await crm.logActivity({
    entityType: 'project',
    entityId: project.id,
    kind: 'client_update',
    // The title carries the delivery fact; the body is what the client read.
    title: emailed ? `Update sent to ${to}` : 'Update recorded (no email address on file)',
    body: message,
    actor,
    meta: milestoneCompleted ? { milestoneCompleted } : undefined,
  });

  return { emailed, to, milestoneCompleted };
}
