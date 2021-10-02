const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();

//const url = "mongodb://localhost:27017";
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

module.exports = {
  //database
  db: null,

  //collections
  students: null,
  mentors: null,

  async connect() {
    await client.connect(); // connecting to mongodb
    this.db = client.db("ZenClass"); // selecting the database
    this.students = this.db.collection("students"); //selecting the collection from above database
    this.mentors = this.db.collection("mentors");
  },
};
