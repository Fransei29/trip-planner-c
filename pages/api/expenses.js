import { MongoClient } from "mongodb";

const url = process.env.MONGO_URI;

export default async function handler(req, res) {
  const client = new MongoClient(url);
  await client.connect();
  const db = client.db("tripcost");
  const expenses = db.collection("expenses");

  if (req.method === "POST") {
    const { trip, date, amount, category, description } = req.body;
    const result = await expenses.insertOne({ trip, date, amount, category, description });
    res.status(200).json({ ok: true, result });
  } else if (req.method === "GET") {
    const { trip } = req.query;
    const items = await expenses.find({ trip }).toArray();
    res.status(200).json({ expenses: items });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

  client.close();
}
