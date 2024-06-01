const express = require('express');
const { getData, detailData } = require('./nutrition.service');
const router = express.Router();
// const extractToken = require('../../middlewares/extractToken');

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
                message: "token are required"
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
            message: 'Error occured while getting nutrition data',
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
                message: "token are required"
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
            message: 'Error occured while getting nutrition data',
            data: error.message
        })
    }
});

module.exports = router;