const express = require('express');
const router = express.Router();
const { getData } = require('./article.service');

function extractToken(req, res, next) {
    const authHeader = req.headers.authorization;
    req.token = authHeader && authHeader.split(' ')[1];
    next();
}

// POST /api/v1/article mengambil data artikel
router.get('/', extractToken, async (req, res) => {
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
            message: 'Error occurred while getting article data',
            data: error.message
        })
    }
});

module.exports = router;