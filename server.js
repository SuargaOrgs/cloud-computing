const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 📦 Route
const authRouter = require('./src/handlers/auth/auth.controller');
const assessmentRouter = require('./src/handlers/assessment/assessment.controller');
const nutritionRouter = require('./src/handlers/nutrition/nutrition.controller');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🏚️ Default Route
app.get("/", (_req, res) => {
    res.status(200).json({ message: "This Api for Suarga App" });
});

app.get("/api/v1", (_req, res) => {
    res.status(200).json({ message: "This Api for Suarga App version 1" });
});

// 🚀 API ROUTE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/assessment', assessmentRouter);
app.use('/api/v1/nutrition', nutritionRouter);

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Project run on port: ${port}`);
});
