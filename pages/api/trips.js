import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await clientPromise;
    const db = client.db("tripcost");
    const trips = db.collection("trips");

    if (req.method === "POST") {
      const { name } = req.body;
      const result = await trips.insertOne({ name });
      return res.status(200).json({ ok: true, result });
    }

    if (req.method === "GET") {
      const items = await trips.find().toArray();
      return res.status(200).json({ trips: items });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
