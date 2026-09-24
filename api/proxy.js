// api/proxy.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { path, ...query } = req.query;
  if (!path) return res.status(400).json({ error: "Missing path" });

  const targetUrl = new URL(`https://api.green-api.com${path}`);
  Object.entries(query).forEach(([k, v]) => targetUrl.searchParams.set(k, v));

  try {
    const response = await fetch(targetUrl.toString(), {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    return res.status(500).json({ error: "Proxy failed" });
  }
}
