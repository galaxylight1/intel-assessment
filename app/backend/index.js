import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const filter = {};

const app = express();

app.use(cors());
app.use(express.json());

const client = await MongoClient.connect(process.env.MONGODB_CONNECT_URI);
const collection = client.db("intel").collection("processors");

app.get("/", async (req, res) => {
  const cursor = collection.find(filter);
  const result = await cursor.toArray();
  res.send(result);
});

app.post("/", async (req, res) => {
  const reqObj = req.body;
  const startIdx = reqObj.from;
  const endIdx = reqObj.to;
  const skipCount = startIdx;

  // calculating the number of documents to limit
  const limitCount = endIdx - startIdx;
  const cursor = collection.find({}).skip(skipCount).limit(limitCount);
  const result = await cursor.toArray();

  res.send(result);
});

app.get("/totalCount", async (req, res) => {
  const result = await collection.countDocuments({});
  res.json({ totalCount: result });
});

app.listen(process.env.PORT, () =>
  console.info("backend running on port 8080")
);
