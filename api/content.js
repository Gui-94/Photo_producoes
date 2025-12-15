import { MongoClient } from "mongodb"
import jwt from "jsonwebtoken"

const uri = process.env.MONGO_URI
const dbName = "studio"
const collectionName = "conteudo"

let cachedClient = null

async function connectDB() {
  if (cachedClient) return cachedClient
  const client = new MongoClient(uri)
  await client.connect()
  cachedClient = client
  return client
}

function verifyToken(req) {
  const auth = req.headers.authorization
  if (!auth) throw new Error("Token ausente")

  const token = auth.split(" ")[1]
  return jwt.verify(token, process.env.JWT_SECRET)
}

export default async function handler(req, res) {
  try {
    const client = await connectDB()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    // 🔹 GET — site público
    if (req.method === "GET") {
      const content = await collection.findOne({})

      // se ainda não existir nada no banco
      if (!content) {
        return res.json({
          heroTitle: "",
          heroDesc: "",
          sobre: "",
          img1: "",
          img2: "",
          img3: "",
          img4: ""
        })
      }

      return res.json(content)
    }

    // 🔒 PUT — apenas admin
    if (req.method === "PUT") {
      verifyToken(req)

      const {
        heroTitle,
        heroDesc,
        sobre,
        img1,
        img2,
        img3,
        img4
      } = req.body

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
      )

      return res.json({ success: true })
    }

    return res.status(405).end()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ error: err.message })
  }
}
