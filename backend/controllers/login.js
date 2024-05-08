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












const checkUser = async (req, res) => {
  const { username, userPassword} = req.body;
  // console.log("Username:", username); // Log the username provided by the user

  try {
    // Retrieve the hashed password from the database for the provided username
    const query = "SELECT password_hash, isAdmin FROM login WHERE username = $1";
    const result = await pool.query(query, [username]);
    // console.log("Query Result:", result.rows); // Log the result of the database query

    if (result.rows.length === 0) {
      // Username not found
      return res.status(404).json({ message: "Username not found" });
    }

    const hashedPassword = result.rows[0].password_hash;
    const isAdminResult = result.rows[0].isadmin
   
    // console.log("Hashed Password:", hashedPassword); // Log the hashed password retrieved from the database

    // Compare the provided password with the hashed password retrieved from the database
    const passwordMatch = await bcrypt.compare(userPassword, hashedPassword);

    if (passwordMatch) {
      // Passwords match
      res.status(200).json({ message: "Username and password match", isAdminResult });
    } else {
      // Passwords do not match
      res.status(401).json({ message: "Username and password do not match" });
    }
  } catch (error) {
    console.error("Error checking user:", error.message); // Log any error that occurs
    res.status(500).json({ message: "Error checking user" });
  }
};