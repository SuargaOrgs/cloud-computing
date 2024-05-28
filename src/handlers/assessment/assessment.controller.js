const express = require('express');
const router = express.Router();
const {createAssessment} = require('./assessment.service');

// GET /api/v1/assessment
router.get('/', async (req, res) => {
    
    const { token } = req.body;

    if (token == null) {
        return res.status(404).json({ error: 'Token is required' });
    }

    try {
        const response = await getAssessment({ token });
        const status = response.status;

        console.log("LOG ASSESSMENT", response);

        res.status(status).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan pada sistem' });
    }

});

// POST /api/v1/assessment
router.post('/', async (req, res) => {
    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak } = req.body;

    if (token == null || tinggiBadan == null || beratBadan == null || aktivitasHarian == null || faktor == null) {
        return res.status(404).json({ error: 'All fields are required' });
    }

    const validAktivitas = ['Istirahat Bed Rest', 'Bed Rest dengan aktivitas terbatas', 'Turun dari tempat tidur', 'Aktivitas sedang', 'Aktivitas berat'];
    if (!validAktivitas.includes(aktivitasHarian)) {
        return res.status(401).json({ error: 'Invalid aktivitasHarian value' });
    }

    const validFaktor = ['Tidak ada stress', 'Stress ringan', 'Stress sedang', 'Stress berat', 'Stress sangat berat'];
    if (!validFaktor.includes(faktor)) {
        return res.status(401).json({ error: 'Invalid faktor value' });
    }

    try {
        const response = await createAssessment({ token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak });
        const status = response.status;

        console.log("LOG ASSESSMENT", response);

        res.status(status).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan pada sistem' });
    }
});

module.exports = router;
