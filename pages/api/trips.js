export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Cabeceras permitidas
  
    // Manejar preflight (peticiones OPTIONS)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    // Aquí continúa tu lógica para manejar GET y POST
    const { MongoClient } = require('mongodb');
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);
  
    try {
      await client.connect();
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
    } finally {
      await client.close();
    }
  }
  