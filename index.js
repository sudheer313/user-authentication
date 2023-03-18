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

    // Check if collections exist in the database
    const collectionsList = await db.listCollections().toArray();

    // If users collection doesn't exist, create it
    if (!collectionsList.some((c) => c.name === "users")) {
      await db.createCollection("users");
      console.log("Users collection created!");

      // create unique index for email field
      await db.collection("users").createIndex({ email: 1 }, { unique: true });
      console.log("Index created for email field");
    } else {
      console.log("Users collection already exists!");
    }

    //Routes
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    //start server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server started on Port ${PORT}`);
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
