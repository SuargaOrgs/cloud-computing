const express = require('express');
const router = express.Router();
const {createAssessment} = require('./assessment.service');

// POST /api/v1/assessment
router.post('/', async (req, res) => {
    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor } = req.body;


    if (token == null || tinggiBadan == null || beratBadan == null || aktivitasHarian == null || faktor == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof tinggiBadan !== 'number' || typeof beratBadan !== 'number') {
        return res.status(400).json({ error: 'tinggiBadan and beratBadan must be numbers' });
    }

    const validAktivitas = ['Istirahat Bed Rest', 'Bed Rest dengan aktivitas terbatas', 'Turun dari tempat tidur', 'Aktivitas sedang', 'Aktivitas berat'];
    if (!validAktivitas.includes(aktivitasHarian)) {
        return res.status(400).json({ error: 'Invalid aktivitasHarian value' });
    }

    const validFaktor = ['Tidak ada stress', 'Stress ringan', 'Stress sedang', 'Stress berat', 'Stress sangat berat'];
    if (!validFaktor.includes(faktor)) {
        return res.status(400).json({ error: 'Invalid faktor value' });
    }

    try {
        const response = await createAssessment({ token, tinggiBadan, beratBadan, aktivitasHarian, faktor });
        const status = response.status;

        console.log("LOG ASSESSMENT", response);

        res.status(status).json(response)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan assessment' });
    }
});

module.exports = router;
