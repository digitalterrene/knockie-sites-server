const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();
const connectionString = process.env.MONGO_URI || "";
const client = new MongoClient(connectionString);

let db;
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB in controller");
    return client.db("vertueal-accounts");
  } catch (error) {
    console.error("MongoDB connection error in controller:", error);
  }
};
(async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("vertueal-accounts");
  } catch (error) {
    console.error(error);
  }
})();
module.exports = { connectToDatabase };
