const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

// 📦 Route
const authRouter = require('./src/handlers/auth/auth.controller');
const assessmentRouter = require('./src/handlers/assessment/assessment.controller');
const nutritionRouter = require('./src/handlers/nutrition/nutrition.controller');
const articleRouter = require('./src/handlers/article/article.controller');

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
app.use('/api/v1/article', articleRouter);

app.get('/predict', async (_req, res) => {
    try {

        const model = await tf.loadLayersModel('https://storage.googleapis.com/bucket-suarga-app/model/modelNW.json');
        // const model = await tf.loadGraphModel('https://storage.googleapis.com/bucket-suarga-app/model/modelNW.json');
        // const model = await tf.loadLayersModel('https://storage.googleapis.com/pcp-detection/model.json');
        
        model ? console.log(model) : console.log("Model Loaded Failed");

        res.json({
            message: "Model Loaded Successfully",
            data: {
                model: model
            }
        });

    } catch (error) {
        return res.status(400).json({
            message: "Predict Gagal",
            error: error.message
        });
    }
});

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
