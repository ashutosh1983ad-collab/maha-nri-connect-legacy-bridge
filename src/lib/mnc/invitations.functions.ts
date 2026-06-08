import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const InvitationSchema = z.object({
  role: z.enum(["core", "patrons", "ambassadors", "changemakers"]),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  country: z.string().trim().min(2).max(80),
  city: z.string().trim().min(2).max(80),
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
  patrons: "Patrons",
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
        from: "Maha NRI Connect <onboarding@resend.dev>",
        to: NOTIFY_EMAILS,
        subject: `New ${roleLabel} invitation — ${data.fullName}`,
        html,
      });

      if (result.error) {
        console.error("[submitInvitation] Resend error:", JSON.stringify(result.error));
        throw new Error(`Email delivery failed: ${result.error.message ?? JSON.stringify(result.error)}`);
      }

      console.log("[submitInvitation] Email sent, id:", result.data?.id);

      return {
        ok: true as const,
        message:
          "Thank you. Your interest has been received. A member of the founding team will be in touch shortly.",
      };
    } catch (err) {
      console.error("[submitInvitation error]", err);
      throw err;
    }
  });
