require("dotenv").config();
const mongoose = require("mongoose");
const DBURL = process.env.DBURL;
const db = mongoose.connect(DBURL);
if (db) {
  console.log("Connected to MongoDB");
}
