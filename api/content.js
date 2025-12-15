import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.MONGO_URI;
const dbName = "studio";
const collectionName = "conteudo";

let cachedClient = null;

async function connectDB() {
  if (cachedClient) return cachedClient;

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) throw new Error("Token ausente");

  const token = auth.split(" ")[1];
  return jwt.verify(token, process.env.JWT_SECRET);
}

export default async function handler(req, res) {
  // 🔥 CORS (obrigatório)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const client = await connectDB();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 🔓 GET — público
    if (req.method === "GET") {
      const content = await collection.findOne({});

      return res.status(200).json(
        content || {
          heroTitle: "",
          heroDesc: "",
          sobre: "",
          img1: "",
          img2: "",
          img3: "",
          img4: ""
        }
      );
    }

    // 🔒 PUT — admin
    if (req.method === "PUT") {
      verifyToken(req);

      // 🔥 parse manual do body
      const body = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => (data += chunk));
        req.on("end", () => resolve(JSON.parse(data || "{}")));
        req.on("error", reject);
      });

      const {
        heroTitle,
        heroDesc,
        sobre,
        img1,
        img2,
        img3,
        img4
      } = body;

      await collection.updateOne(
        {},
        {
          $set: {
            heroTitle,
            heroDesc,
            sobre,
            img1,
            img2,
            img3,
            img4
          }
        },
        { upsert: true }
      );

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Método não permitido" });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: err.message });
  }
}
