import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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

export const submitInvitation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InvitationSchema.parse(data))
  .handler(async ({ data }) => {
    // Email-only delivery: log a structured payload server-side so it appears
    // in worker logs. A follow-up step will wire this to the project's email
    // domain once Lovable Cloud + email infra is enabled.
    const summary = {
      receivedAt: new Date().toISOString(),
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      organisation: data.organisation,
      linkedin: data.linkedin,
      preferredTime: data.preferredTime,
      contributionAreas: data.contributionAreas,
      contribution: data.contribution,
    };

    // eslint-disable-next-line no-console
    console.log("[MahaNRI invitation]", JSON.stringify(summary));

    return {
      ok: true as const,
      message:
        "Thank you. Your interest has been received. A member of the founding team will be in touch shortly.",
    };
  });
