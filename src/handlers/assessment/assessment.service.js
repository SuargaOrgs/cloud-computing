const prisma = require('../../helpers/prisma');
const {verifyToken} = require('../../middlewares/jwt');

async function createAssessment(data) {

    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor } = data;

    const verify = await verifyToken(token)
    if (!verify) {
        return {
            status: 404,
            error: true,
            message: "Token not valid"
        }
    }


    // Validasi aktivitasHarian
    const validAktivitas = ['Istirahat Bed Rest', 'Bed Rest dengan aktivitas terbatas', 'Turun dari tempat tidur', 'Aktivitas sedang', 'Aktivitas berat'];
    if (!validAktivitas.includes(aktivitasHarian)) {
        return {
            status: 404,
            error: true,
            message: "Harap pilih salah satu dari pilihan aktivitas yang tersedia"
        }
    }

    // Validasi faktor
    const validFaktor = ['Tidak ada stress', 'Stress ringan', 'Stress sedang', 'Stress berat', 'Stress sangat berat'];
    if (!validFaktor.includes(faktor)) {
        return {
            status: 404,
            error: true,
            message: "Harap pilih salah satu dari pilihan faktor yang tersedia"
        }
    }

    // Jika semua validasi berhasil, buat assessment
    try {
        await prisma.assessment.create({
            data:{
                idUser: verify.idUser,
                tinggiBadan : tinggiBadan,
                beratBadan : beratBadan,
                aktivitasHarian: aktivitasHarian,
                faktor : faktor
            }
        });

        return {
            status: 200,
            error: false,
            message: "Assesment berhasil disimpan"
        };
    } catch (error) {
        console.error(error);
        return { status: 500, error: true, message: 'Assessment gagal disimpan', data: error.message };
    }
}

module.exports = {
    createAssessment,
};
