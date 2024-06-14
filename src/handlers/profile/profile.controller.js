const express = require('express');
const { editData } = require('./profile.service');
const router = express.Router();

function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    req.token = authHeader && authHeader.split(' ')[1];
    next();
}

router.get('/', (_req, res) => {
    res.status(200).json({ message: "Welcome to route profile Suarga App" });
});

// POST /api/v1/profile/edit update data profile
router.post('/edit', extractToken, async (req, res) => {
    try {
        const { token } = req;
        const { namaLengkap, email, tanggalLahir } = req.body;

        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required"
            });
        }

        const response = await editData({ token, namaLengkap, email, tanggalLahir });
        const status = response.status;

        console.log("LOG :", response);

        res.status(status).json(response)
    } catch (error) {
        console.log("ERROR :", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occurred while updating profile data',
            data: error.message
        })
    }
});

module.exports = router;