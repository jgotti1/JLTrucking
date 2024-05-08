const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

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

// ----------controllers--------------

const jobsController = require("./controllers/Jobs");
const loginController = require("./controllers/UserLogin");

// ----------- routes -------------

// default route
app.get("/", (req, res) => {
  res.send("Welcome to the JL Trucking App");
});

app.use("/login", loginController)
app.use("/jobs", jobsController)

// Start Server

app.listen(port, async () => {

  try {
    // Test the database connection
    const result = await db.query("SELECT NOW()");
    console.log("Database connection successful at", result.rows[0].now);
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
  console.log(`App up and running on ${port}`)
});
