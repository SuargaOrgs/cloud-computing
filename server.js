const express = require("express");
const cors = require("cors");
const multer = require("multer");
const tf = require('@tensorflow/tfjs');
require("dotenv").config();
const app = express();
const port = 3000;
const upload = multer();

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


app.post('/uploadGambar', upload.single("image"), (req, res) => {
    console.log("Req: ",req);
    
    res.json({
        message: "Upload Gambar Berhasil",
        data: req.file
    });

});

app.get('/predict', async (req, res) => {
    const model = await tf.loadLayersModel('./src/models/models.json');
    
    // let data = {
    //   gender: Number(req.body.gender),
    //   height: Number(req.body.height),
    //   weight: Number(req.body.weight),
    // };
    
    // const example = tf.tensor2d([[data.gender, data.height, data.weight]]);
    // const prediction = model.predict(example).argMax(1).dataSync()[0];
    // const category = categoryleveling[prediction];
    // res.json({ prediction, category });
    
    res.json({
        message: "Predict Berhasil",
        data: model
    })
});

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
