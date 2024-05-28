const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');

async function createAssessment(data) {

    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak } = data;

    const verify = verifyToken(token)
    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Token not valid"
        }
    }

    try {
        await prisma.assessment.create({
            data:{
                idUser: verify.idUser,
                tinggiBadan : tinggiBadan,
                beratBadan : beratBadan,
                aktivitasHarian: aktivitasHarian,
                faktor : faktor,
                karbohidrat : karbohidrat,
                protein : protein,
                lemak : lemak
            }
        });

        return {
            status: 200,
            error: false,
            message: "Assesment berhasil disimpan"
        };
    } catch (error) {
        return { 
            status: 500, 
            error: true, 
            message: 'Assessment gagal disimpan', 
            data: error.message 
        };
    }
}

module.exports = {
    createAssessment,
};
