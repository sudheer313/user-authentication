const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "user-authentication";

async function main() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    // Access a database
    const db = client.db(dbName);

    // Do something with the database
    // ...
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:", databasesList.databases);

    const collectionsList = await db.listCollections().toArray();
    console.log("Collections:", collectionsList);

    //create collection
    db.createCollection("users", function (err, res) {
      if (err) throw err;
      console.log("Users collection created!");

      //drop collection if it exists

      db.collection("users").drop(function (err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
      });

      // create unique index for email field
      db.collection("users").createIndex(
        { email: 1 },
        { unique: true },
        function (err, res) {
          if (err) throw err;
          console.log("Index created for email field");
        }
      );
      //Routes
      app.get("/", (req, res) => {
        res.send("Hello World");
      });

      //start server
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server started on Port ${PORT}`);
      });
    });
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    if (client.isConnected) {
      await client.close();
      console.log("Disconnected from MongoDB.");
    }
  }
}

main();
