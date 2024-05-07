const express = require("express");
const bcrypt = require("bcrypt");


const { Pool } = require("pg");


// connect Railway
const pool = new Pool({
  user: "postgres",
  host: "roundhouse.proxy.rlwy.net",
  database: "JLT",
  password: "TkxRwKhStZKOOvmkVrXkZEJZdxSOLEjQ",
  port: 16979,
});


const app = express();
const PORT = 5005;

app.use(express.json());

// Test database connectivity
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
    done(); // Release the client back to the pool
  }
});

// Route to handle user registration
app.post("/new", async (req, res) => {
  const { username, userPassword } = req.body;
  console.log(req.body);

  // Check if username and password are present
  if (!username || !userPassword) {
    return res.status(400).send("Username and password are required");
  }

  // Check if userPassword is a string
  if (typeof userPassword !== "string") {
    return res.status(400).send("Password must be a string");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10); // Use userPassword

    // Insert the username and hashed password into the database
    const query = "INSERT INTO users (username, password_hash) VALUES ($1, $2)";
    const values = [username, hashedPassword];
    console.log(values);
    await pool.query(query, values);

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

