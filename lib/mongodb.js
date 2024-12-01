import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!process.env.MONGO_URI) {
  throw new Error('Por favor, define la variable MONGO_URI en .env');
}

if (process.env.NODE_ENV === 'development') {
  // Para desarrollo, usa una variable global para mantener la conexión
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Para producción, usa una nueva conexión
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
