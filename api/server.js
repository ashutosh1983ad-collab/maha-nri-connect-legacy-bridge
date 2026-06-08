import handler from "../dist/server/server.js";

export default async function (req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  // Convert Node.js headers object to Headers instance
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach((v) => headers.append(key, v));
    } else if (value != null) {
      headers.set(key, value);
    }
  }

  let body = undefined;
  if (!["GET", "HEAD"].includes(req.method)) {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks);
  }

  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body: body ?? null,
  });

  const response = await handler.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }
  const buf = await response.arrayBuffer();
  res.end(Buffer.from(buf));
}
