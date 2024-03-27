import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const filter = {};

const client = await MongoClient.connect("mongodb://localhost:27017/intel");
const collection = client.db("intel").collection("processors");

// await client.close();

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const cursor = collection.find(filter);
  const result = await cursor.toArray();
  res.send(result[0]);
});

app.listen(8080, () => console.log("backend running on port 8080"));
