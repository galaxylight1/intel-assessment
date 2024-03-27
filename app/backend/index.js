import { MongoClient } from "mongodb";

const filter = {};

const client = await MongoClient.connect("mongodb://localhost:27017/intel");
const coll = client.db("intel").collection("processors");
const cursor = coll.find(filter);
const result = await cursor.toArray();
console.log(result);
await client.close();
