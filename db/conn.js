const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/testemongodb2";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.log(err);
  }
}

run();

module.exports = client;
