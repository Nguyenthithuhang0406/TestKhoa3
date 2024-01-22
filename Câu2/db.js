const mongoose = require("mongoose");
const {MongoClient} = require("mongodb");
const MONGO_URI = "mongodb://localhost:27017/database";

const db = {};

async function connectDB() {
  const client = new MongoClient(MONGO_URI);
  client.connect(() => {
    const database = client.db("database");
    db.inventories = database.collection("inventories");
    db.orders = database.collection("orders");
    db.users = database.collection("users");
    console.log("connect db ok");
  });
};

module.exports = { connectDB, db };