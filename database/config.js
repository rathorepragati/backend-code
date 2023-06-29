var { MongoClient } = require("mongodb");
// const MongoClient = require('mongodb').Client;
const createDb = async ()=> {
    var url = "mongodb://0.0.0.0:27017/";
    const client = new MongoClient(url);
    var db = client.db("admin");
    var collection = db.collection("students");
    console.log("collection", collection);
    return collection;
  }
  module.exports = createDb;