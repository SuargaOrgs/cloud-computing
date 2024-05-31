const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

// 📦 Route
const authRouter = require('./src/handlers/auth/auth.controller');
const assessmentRouter = require('./src/handlers/assessment/assessment.controller');

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

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

app.post('/uploadGambar', (req, res) => {

    console.log("Req: ",req);

    return res.status(200).json({ message: "Upload Image", image: req });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
