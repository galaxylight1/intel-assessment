import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const client = await MongoClient.connect(process.env.MONGODB_CONNECT_URI);
const collection = client.db("intel").collection("processors");

app.get("/", async (req, res) => {
  const filter = {};
  const cursor = collection.find(filter);
  const result = await cursor.toArray();
  res.send(result);
});

app.get("/pie", async (req, res) => {
  // const cursor = collection.find(filter);
  // const result = await cursor.toArray();
  const results = await collection
    .aggregate([
      {
        $facet: {
          Desktop: [
            { $match: { "Essentials.Vertical Segment": "Desktop" } },
            { $count: "count" },
          ],
          Server: [
            { $match: { "Essentials.Vertical Segment": "Server" } },
            { $count: "count" },
          ],
          Mobile: [
            { $match: { "Essentials.Vertical Segment": "Mobile" } },
            { $count: "count" },
          ],
          Workstation: [
            { $match: { "Essentials.Vertical Segment": "Workstation" } },
            { $count: "count" },
          ],
          Launched: [
            { $match: { "Essentials.Status": "Launched" } },
            { $count: "count" },
          ],
          Discontinued: [
            { $match: { "Essentials.Status": "Discontinued" } },
            { $count: "count" },
          ],
          Announced: [
            { $match: { "Essentials.Status": "Announced" } },
            { $count: "count" },
          ],
          Total: [{ $match: {} }, { $count: "count" }],
        },
      },
    ])
    .toArray();

  const result1 = results[0].Desktop[0].count;
  const result2 = results[0].Server[0].count;
  const result3 = results[0].Mobile[0].count;
  const result4 = results[0].Workstation[0].count;
  const result5 = results[0].Launched[0].count;
  const result6 = results[0].Discontinued[0].count;
  const result7 = results[0].Announced[0].count;

  const total = results[0].Total[0].count;

  const percent1 = result1 / total;
  const percent2 = result2 / total;
  const percent3 = result3 / total;
  const percent4 = result4 / total;

  const percent5 = result5 / total;
  const percent6 = result6 / total;
  const percent7 = result7 / total;

  res.send({
    desktopPercent: percent1,
    serverPercent: percent2,
    mobilePercent: percent3,
    workstationPercent: percent4,
    launchedPercent: percent5,
    discontinuedPercent: percent6,
    announcedPercent: percent7,
  });
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
