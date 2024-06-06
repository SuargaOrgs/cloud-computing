const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
require("dotenv").config();
const app = express();
const port = 3000;
const upload = multer();

// class L2 {

//     static className = 'L2';

//     constructor(config) {
//        return tf.regularizers.l1l2(config)
//     }
// }
// tf.serialization.registerClass(L2);

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

app.get("/TestModel", (_req, res) => {
    res.status(200).json({ message: "Model Testing" });
});

// 🚀 API ROUTE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/assessment', assessmentRouter);
app.use('/api/v1/nutrition', nutritionRouter);

app.post('/uploadGambar', upload.single("image"), (req, res) => {
    console.log("Req: ", req);

    res.json({
        message: "Upload Gambar Berhasil",
        data: req.file
    });
});

// app.get('/getMyModel', async (req, res) => {
//     const filePath = path.resolve(__dirname, './src/models/models.json');
//     return res.sendFile(filePath);
// });

// app.get('/predict', async (req, res) => {
//     try {
//         const model = await tf.loadLayersModel('http://localhost:3000/getMyModel');
//         // const model = await tf.loadLayersModel('https://storage.googleapis.com/pcp-detection/model.json');
//         // const model = await tf.loadLayersModel('https://raw.githubusercontent.com/sofit-c23-ps233/SoFit-MachineLearning/main/model_ml/model.json');

//         res.json({
//             message: "Predict Berhasil",
//             data: model.summary()
//         })
//     } catch (error) {
//         res.json({
//             message: "Predict Gagal",
//             data: error.message
//         });
//     }

// });

// 💨 Not Found Route
app.get("*", (_req, res) => {
    res.status(404).send("Route Not found");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
