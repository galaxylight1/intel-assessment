import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const filter = {};

const client = await MongoClient.connect("mongodb://localhost:27017/intel");
const collection = client.db("intel").collection("processors_new");

const app = express();
app.use(cors());
app.use(express.json());

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

  // Calculate the number of documents to limit
  const limitCount = endIdx - startIdx;
  const cursor = collection.find({}).skip(skipCount).limit(limitCount);
  const result = await cursor.toArray();

  res.send(result);
});

app.get("/totalCount", async (req, res) => {
  const result = await collection.countDocuments({});
  res.json({ totalCount: result });
});

app.listen(8080, () => console.info("backend running on port 8080"));
