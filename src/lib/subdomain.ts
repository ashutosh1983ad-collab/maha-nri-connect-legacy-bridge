import type { RoleSlug } from "./mnc/roles";

const SUBDOMAIN_TO_SLUG: Record<string, RoleSlug> = {
  core: "core",
  patrons: "patrons",
  ambassadors: "ambassadors",
  changemakers: "changemakers",
};

const SLUG_TO_PATH: Record<RoleSlug, string> = {
  core: "/core",
  patrons: "/patrons",
  ambassadors: "/ambassadors",
  changemakers: "/changemakers",
};

/**
 * Extracts the MNC subdomain slug from a host header.
 * Returns null when running on the root domain or localhost (no enforcement in dev).
 */
export function getSubdomainSlug(host: string): RoleSlug | null {
  const hostname = host.split(":")[0];
  if (hostname === "localhost" || hostname === "127.0.0.1") return null;

  const parts = hostname.split(".");
  if (parts.length < 3) return null;

  const sub = parts[0].toLowerCase();
  return SUBDOMAIN_TO_SLUG[sub] ?? null;
}

export function getCanonicalPath(slug: RoleSlug): string {
  return SLUG_TO_PATH[slug];
}
