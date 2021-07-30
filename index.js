import dotenv from "dotenv";
dotenv.config();
import mongoConnection from "./mongo.js";
import express from "express";
import { urlencoded, json } from "body-parser";

await mongoConnection();

import cors from "cors";

const port = process.env.PORT || 3330;

const app = express();

app.use(cors());

app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

app.listen(port, async () => {
  console.log("Running on port " + port);
});
