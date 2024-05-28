const express = require('express');
const router = express.Router();
const {createAssessment, getAssessment} = require('./assessment.service');

// GET /api/v1/assessment
router.get('/', async (req, res) => {
    
    const { token } = req.body;

    if (token == null) {
        return res.status(404).json({
            error: true,
            message: "Token is required"
        });
    }

    try {
        const response = await getAssessment({ token });
        const status = response.status;

        console.log("LOG ASSESSMENT", response);

        res.status(status).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan pada sistem",
            data: error.message
        });
    }

});

// POST /api/v1/assessment
router.post('/', async (req, res) => {
    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak } = req.body;

    if (token == null || tinggiBadan == null || beratBadan == null || aktivitasHarian == null || faktor == null) {
        return res.status(404).json({
            error: true,
            message: "All fields are required"
        });
    }

    const validAktivitas = ['Istirahat Bed Rest', 'Bed Rest dengan aktivitas terbatas', 'Turun dari tempat tidur', 'Aktivitas sedang', 'Aktivitas berat'];
    if (!validAktivitas.includes(aktivitasHarian)) {
        return res.status(401).json({
            error: true,
            message: "Invalid aktivitas harian value"
        });
    }

    const validFaktor = ['Tidak ada stress', 'Stress ringan', 'Stress sedang', 'Stress berat', 'Stress sangat berat'];
    if (!validFaktor.includes(faktor)) {
        return res.status(401).json({
            error: true,
            message: "Invalid faktor value"
        });
    }

    try {
        const response = await createAssessment({ token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak });
        const status = response.status;

        console.log("LOG ASSESSMENT", response);

        res.status(status).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan pada sistem",
            data: error.message
        });
    }
});

module.exports = router;
