import handler from "../dist/server/server.js";

const FORBIDDEN_HEADERS = new Set([
  "connection", "keep-alive", "transfer-encoding",
  "upgrade", "te", "trailer", "proxy-connection",
]);

export default async function (req, res) {
  const host = req.headers.host || "localhost";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (FORBIDDEN_HEADERS.has(key.toLowerCase())) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value != null) {
      headers.set(key, value);
    }
  }

  let body = null;
  if (!["GET", "HEAD"].includes(req.method)) {
    // Convert Node.js readable stream to a Web ReadableStream
    body = new ReadableStream({
      start(controller) {
        req.on("data", (chunk) => controller.enqueue(chunk));
        req.on("end", () => controller.close());
        req.on("error", (err) => controller.error(err));
      },
    });
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
    // Required for streaming body in Node.js fetch
    duplex: "half",
  });

  const response = await handler.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }
  const buf = await response.arrayBuffer();
  res.end(Buffer.from(buf));
}
