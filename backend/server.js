import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import pkg from "pg"; // Import 'pg' as a default package
const { Pool } = pkg; // Destructure the Pool class from the imported package
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default to 5432 if not provided
});

// Check if the database is connected
pool
  .connect()
  .then(() => console.log("Connected to the PostgreSQL database"))
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit if connection to the database fails
  });

// User Signup Route
app.post("/signup", async (req, res) => {
  const { full_name, email, password } = req.body;

  // Validate request body
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Check if the email already exists in the database
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [full_name, email, hashedPassword]
    );

    res.status(201).json({ message: "User created", user: result.rows[0] });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if JWT_SECRET is provided in .env file
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in the environment variables.");
    return res.status(500).json({ error: "Server configuration error: JWT_SECRET not set." });
  }

  try {
    // Fetch user from the database by email
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create a JWT token and send it back to the client
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
