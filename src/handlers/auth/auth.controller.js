const express = require('express');
const { login, register } = require('./auth.service');

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

        res.status(status).json(response)

    } catch (error) {
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

        console.log('User input:', { email, password, fullName, birthday, pregnancyDate });

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
    
        res.status(status).json(response)
    
    } catch (error) {
        
        res.status(500).json({
            error: true,
            message: 'Error occured while registering',
            data: error.message
        })

    }
    
});

module.exports = router;