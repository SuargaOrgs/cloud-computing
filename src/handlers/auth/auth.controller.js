const express = require('express');
const { login, register } = require('./auth.service');
const { verifyToken } = require('../../middlewares/jwt');

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json({ message: "Welcome to route Auth Suarga App" });
});

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Email and password are required"
            });
        }

        const response = await login(email, password);
        const status = response.status;

        console.log("LOG LOGIN:", response);

        res.status(status).json(response)

    } catch (error) {

        console.log("ERROR LOGIN:", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occured while logging in',
            data: error.message
        })
    }
});

router.post('/register', async (req, res) => {
    try {

        const { email, password, fullName, birthday, pregnancyDate } = req.body;

        if (!email || !password || !fullName || !birthday || !pregnancyDate) {
            return res.status(400).json({
                error: true,
                message: "All fields are required",
                data: {
                    email: email ?? null,
                    password: password ?? null,
                    fullName: fullName ?? null,
                    birthday: birthday ?? null,
                    pregnancyDate: pregnancyDate ?? null
                }
            });
        }

        const response = await register(email, password, fullName, birthday, pregnancyDate);
        const status = response.status;

        console.log("LOG REGISTER:", response);

        res.status(status).json(response)

    } catch (error) {

        console.log("ERROR REGISTER:", error.message);

        res.status(500).json({
            error: true,
            message: 'Error occured while registering',
            data: error.message
        })

    }

});

router.post('/verify-token', async (req, res) => {
    try {

        const { token } = req.body;

        if (!token) {
            console.log("LOG : Token is required");
            return res.status(400).json({
                status: 400,
                error: true,
                message: "Token is required",
                data: {
                    token: token ?? null
                }
            });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            console.log("LOG : Invalid Token");
            return res.status(401).json({
                status: 401,
                error: true,
                message: "Invalid token",
            });
        }

        if (decoded.exp < Date.now() / 1000) {
            console.log("LOG : Session expired. Please login again!");
            return res.status(401).json({
                status: 401,
                error: true,
                message: "Session expired. Please login again!",
            });
        }

        console.log("LOG : Token verified successfully");
        res.status(200).json({
            status: 200,
            error: false,
            message: "Token verified successfully",
            data: {
                user: {
                    idUser: decoded.idUser,
                    email: decoded.email,
                    fullName: decoded.fullName,
                    tanggalLahir: decoded.tanggalLahir,
                    tanggalKehamilan: decoded.tanggalKehamilan,
                },
                token,
                active: !(decoded.exp < Date.now() / 1000)
            }
        })

    } catch (error) {

        console.log("ERROR :", error.message);
        res.status(500).json({
            status: 500,
            error: true,
            message: 'Error occured while verifying token',
            data: error.message
        })
    }
});

module.exports = router;