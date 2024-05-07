const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const db = require("./DB/db"); 

const app = express();

const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")))

// setup for running app from backend build folder 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public", "build")));
}

// ----------- routes -------------

// default route
app.get("/", (req, res) => {
  res.send("Welcome to the JL Trucking App");
});



// Start Server

app.listen(port, async () => {

  try {
    // Test the database connection
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful at", result.rows[0].now);
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
  console.log(`App up pand running on ${port}`)
});
