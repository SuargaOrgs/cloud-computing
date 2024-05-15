const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken package
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Import dummy database
const users = require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User Registration Route
app.post("/register", (req, res) => {
    const { email, password, fullName, birthday, pregnancyDate } = req.body;

    // Validate email uniqueness
    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    // Generate unique user ID
    const id = users.length + 1;

    // Save user to the database (replace this with actual database logic)
    const newUser = { id, email, password, fullName, birthday, pregnancyDate };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// User Login Route
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = users.find(user => user.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token with expiration time (90 minutes)
    const token = jwt.sign({ email: user.email, fullName: user.fullName }, JWT_SECRET, { expiresIn: "90m" });

    // Send token as response
    res.status(200).json({ message: "Login successful", token });
});

// Protected route example
app.get("/protected", (req, res) => {
    // This route requires authentication, so you can assume user is authenticated if this code executes
    res.status(200).json({ message: "Protected route accessed" });
});


app.get("/", (_req, res) => {
    res.status(200).json({ message: "This Api for Suarga App" });
});

app.get("/users", (_req, res) => {
    res.status(200).json({ users });
});

app.get("*", (_req, res) => {
    res.status(404).send("Not found");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
