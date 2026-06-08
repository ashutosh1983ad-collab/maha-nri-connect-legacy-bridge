import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { getSubdomainSlug, getCanonicalPath } from "./lib/subdomain";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Enforces that each subdomain only serves its own page.
// core.mahanri.com/patrons → 302 to /core
// core.mahanri.com/        → 302 to /core
const subdomainMiddleware = createMiddleware().server(async ({ next, request }) => {
  const host = request.headers.get("host") ?? "";
  const slug = getSubdomainSlug(host);

  if (!slug) return next(); // root domain or localhost — no enforcement

  const canonicalPath = getCanonicalPath(slug);
  const url = new URL(request.url);

  // Allow TanStack server functions and internal paths through without redirect
  const isInternal =
    url.pathname.startsWith("/_serverFn") ||
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/__");

  if (!isInternal && url.pathname !== canonicalPath) {
    return new Response(null, {
      status: 302,
      headers: { Location: canonicalPath },
    });
  }

  return next();
});

export const startInstance = createStart(() => ({
  requestMiddleware: [subdomainMiddleware, errorMiddleware],
}));
