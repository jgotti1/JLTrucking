/// login.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Import the database connection
const db = require("../DB/db");

router.post("/", async (req, res) => {
  const { username, userPassword } = req.body;

  try {
    // Query the database to find the user by username
    const queryResult = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = queryResult.rows[0];

    if (!user) {
      // If user not found
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare the password provided by the user with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(userPassword, user.password_hash);

    if (!passwordMatch) {
      // If password does not match
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // If both username and password are correct
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
