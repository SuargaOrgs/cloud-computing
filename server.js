const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = 3000;

// 📦 Route
const authRouter = require('./src/handlers/auth/auth.controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🏚️ Default Route
app.get("/", (_req, res) => {
    res.status(200).json({ message: "This Api for Suarga App" });
});

// 🚀 API ROUTE
app.use('/api/v1/auth', authRouter);

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
