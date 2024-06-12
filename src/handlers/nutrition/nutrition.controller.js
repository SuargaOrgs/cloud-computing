const express = require('express');
const { getData, detailData, uploadData, predictImage, saveImageNutrition, getFoodStorage } = require('./nutrition.service');
const router = express.Router();
const multer = require("multer");
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024 // 5 MB
    }
});

function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    req.token = authHeader && authHeader.split(' ')[1];
    next();
}

router.get('/', (_req, res) => {
    res.status(200).json({ message: "Welcome to route nutrition Suarga App" });
});

// POST /api/v1/nutrition mengambil data nutrisi
router.post('/', extractToken, async (req, res) => {
    try {
        const { token } = req;

        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required"
            });
        }

        const response = await getData({ token });
        const status = response.status;

        console.log("LOG :", response);

        res.status(status).json(response)
    } catch (error) {
        console.log("ERROR :", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occurred while getting nutrition data',
            data: error.message
        })
    }
});

// POST /api/v1/nutrition/detail mengambil detail data nutrisi
router.post('/detail', extractToken, async (req, res) => {
    try {
        const { token } = req;

        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required"
            });
        }

        const response = await detailData({ token });
        const status = response.status;

        console.log("LOG :", response);

        res.status(status).json(response)
    } catch (error) {
        console.log("ERROR :", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occurred while getting nutrition data',
            data: error.message
        })
    }
});

// POST /api/v1/nutrition/imageNutrition
router.post('/imageNutrition', extractToken, async (req, res) => {
    try {
        const { token } = req;
        const { linkGambar, namaAktivitas, waktuMakan, idMakanan, porsi } = req.body;

        if (!token || !linkGambar || !namaAktivitas || !waktuMakan || !idMakanan || !porsi) {
            return res.status(400).json({
                error: true,
                message: "All fields are required"
            });
        }

        const response = await saveImageNutrition({ token, linkGambar, namaAktivitas, waktuMakan, idMakanan, porsi });
        const status = response.status;

        res.status(status).json(response)
    } catch (error) {
        console.log("ERROR :", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occurred while saving image nutrition data',
            data: error.message
        })
    }
});

// POST /api/v1/nutrition/upload
// router.post('/upload', extractToken, upload.single("image"), async (req, res) => {
//     try {
//         const { token } = req;

//         if (!token) {
//             return res.status(400).json({
//                 error: true,
//                 message: "token are required"
//             });
//         }

//         const { slugResult, waktuMakan, porsi, namaAktivitas } = req.body;

//         if (!slugResult || !waktuMakan || !porsi || !namaAktivitas) {
//             return res.status(400).json({
//                 error: true,
//                 message: "Fields are required"
//             });
            
//         }

//         if (!req.file) {
//             res.status(400).json({
//                 error: true,
//                 message: "No file uploaded"
//             });
//             return;
//         }

//         const file = req.file

//         const response = await uploadData({ token, file, slugResult, waktuMakan, porsi, namaAktivitas});
//         const status = response.status;

//         console.log("LOG :", response);

//         res.status(status).json(response)

//     } catch (error) {
//         console.log("ERROR :", error.message);

//         res.status(500).json({
//             error: true,
//             message: 'Error occured while getting nutrition data',
//             data: error.message
//         })
//     }
// }, (error, req, res, next) => {
//     if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
//         res.status(413).json({
//             error: true,
//             message: 'File size too large. Max size is 1MB'
//         })
//     } else {
//         next(error);
//     }
// });

// GET /api/v1/nutrition/foodStorage
router.get('/foodStorage', extractToken, async (req, res) => {
    try {
        const { token } = req;

        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required"
            });
        }

        const response = await getFoodStorage({ token });
        const status = response.status;

        res.status(status).json(response)
    } catch (error) {
        console.log("ERROR :", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occured while getting food data',
            data: error.message
        })
    }
});

// POST /api/v1/nutrition/predict
// router.post('/predict', extractToken, upload.single("image"), async (req, res) => {
//     try {

//         const { token } = req;

//         if (!req.file) {
//             res.status(400).json({
//                 error: true,
//                 message: "No file uploaded"
//             });
//             return;
//         }

//         const file = req.file

//         if (!token) {
//             return res.status(400).json({
//                 error: true,
//                 message: "token are required"
//             });
//         }

//         const response = await predictImage({ token, file });
//         const status = response.status;

//         console.log("LOG :", response);

//         res.status(status).json(response)

//     } catch (error) {

//         console.log("ERROR :", error.message);

//         res.status(500).json({
//             error: true,
//             message: 'Error occured while predicting image',
//             data: error.message
//         })
//     }
// }, (error, req, res, next) => {
//     if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
//         res.status(413).json({
//             error: true,
//             message: 'File size too large. Max size is 1MB'
//         })
//     } else {
//         next(error);
//     }
// });

module.exports = router;
