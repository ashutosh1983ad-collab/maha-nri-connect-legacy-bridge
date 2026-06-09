import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const InvitationSchema = z.object({
  role: z.enum(["core", "advisory", "ambassadors", "changemakers"]),
  fullName: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().max(200).optional().default(""),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  city: z.string().trim().max(80).optional().default(""),
  organisation: z.string().trim().max(200).optional().default(""),
  linkedin: z.string().trim().max(300).optional().default(""),
  contribution: z.string().trim().max(2000).optional().default(""),
  preferredTime: z.string().trim().max(120).optional().default(""),
  contributionAreas: z.array(z.string().max(80)).max(20).optional().default([]),
  consent: z.literal(true),
});

export type InvitationInput = z.input<typeof InvitationSchema>;

const NOTIFY_EMAILS = ["ashutosh198ad@gmail.com", "mahanriconnect@gmail.com"];

const ROLE_LABELS: Record<string, string> = {
  core: "Core Management Team",
  advisory: "Elite Advisory Board",
  ambassadors: "Ambassadors",
  changemakers: "Changemakers",
};

export const submitInvitation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InvitationSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const roleLabel = ROLE_LABELS[data.role] ?? data.role;

      const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
        <h2 style="background:#1a1a2e;color:#fff;padding:20px;margin:0">
          New Invitation — ${roleLabel}
        </h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:160px">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${data.fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${data.phone}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Country</td><td style="padding:8px;border-bottom:1px solid #eee">${data.country}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">City</td><td style="padding:8px;border-bottom:1px solid #eee">${data.city}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Organisation</td><td style="padding:8px;border-bottom:1px solid #eee">${data.organisation || "—"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">LinkedIn</td><td style="padding:8px;border-bottom:1px solid #eee">${data.linkedin ? `<a href="${data.linkedin}">${data.linkedin}</a>` : "—"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Preferred Time</td><td style="padding:8px;border-bottom:1px solid #eee">${data.preferredTime || "—"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Contribution Areas</td><td style="padding:8px;border-bottom:1px solid #eee">${data.contributionAreas?.join(", ") || "—"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Message</td><td style="padding:8px">${data.contribution || "—"}</td></tr>
        </table>
        <p style="margin-top:24px;font-size:12px;color:#888">Received at ${new Date().toUTCString()} · Maha NRI Connect</p>
      </div>
    `;

      const result = await resend.emails.send({
        from: "Maha NRI Connect <connect@mahanri.com>",
        to: NOTIFY_EMAILS,
        subject: `New ${roleLabel} invitation — ${data.fullName}`,
        html,
      });

      if (result.error) {
        console.error("[submitInvitation] Resend error:", JSON.stringify(result.error));
        throw new Error(
          `Email delivery failed: ${result.error.message ?? JSON.stringify(result.error)}`,
        );
      }

      console.log("[submitInvitation] Notification sent, id:", result.data?.id);

      // Send confirmation to invitee if email provided
      if (data.email) {
        const confirmHtml = `
        <div style="font-family:'Georgia',serif;max-width:560px;margin:0 auto;color:#1a1a2e;background:#faf9f6;padding:48px 40px">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:#c47d2a;margin:0 0 32px">
            Maha NRI Connect · Elite Advisory Board
          </p>
          <p style="font-size:22px;font-style:italic;line-height:1.4;margin:0 0 24px;color:#1a1a2e">
            Your acceptance has been received.
          </p>
          <p style="font-size:15px;line-height:1.8;color:#444;margin:0 0 16px">
            Dear${data.fullName ? ` ${data.fullName}` : ""},
          </p>
          <p style="font-size:15px;line-height:1.8;color:#444;margin:0 0 16px">
            Thank you for accepting your invitation to join the <strong>Elite Advisory Board</strong> of Maha NRI Connect.
            Your acceptance has been recorded and the founding team has been notified.
          </p>
          <p style="font-size:15px;line-height:1.8;color:#444;margin:0 0 32px">
            Ashutosh and Rahul will write to you personally within 48 hours to discuss the next steps.
          </p>
          <div style="border-top:1px solid #e0d8cc;padding-top:24px;margin-top:32px">
            <p style="font-size:13px;font-style:italic;color:#888;margin:0">
              This is a confirmation of your acceptance. Please keep this for your records.
            </p>
            <p style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#bbb;margin:16px 0 0">
              MNRI · ${roleLabel} · ${new Date().getFullYear()}
            </p>
          </div>
        </div>
        `;
        await resend.emails.send({
          from: "Maha NRI Connect <connect@mahanri.com>",
          to: [data.email],
          subject: `Your acceptance is confirmed — Maha NRI Connect`,
          html: confirmHtml,
        });
        console.log("[submitInvitation] Confirmation sent to:", data.email);
      }

      return {
        ok: true as const,
        message: data.email
          ? "Your acceptance is confirmed. A personal note from Ashutosh and Rahul will follow within 48 hours."
          : "Your acceptance has been received. The founding team will be in touch shortly.",
      };
    } catch (err) {
      console.error("[submitInvitation error]", err);
      throw err;
    }
  });
