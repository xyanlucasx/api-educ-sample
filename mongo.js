import { MongoClient } from "mongodb";

export default async () => {
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  try {
    const mongoConnect = await MongoClient.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    global.mongo = mongoConnect.db("apisample");
    console.log("mongodb connected successfully");
  } catch (e) {
    console.log(e);
  }
};
