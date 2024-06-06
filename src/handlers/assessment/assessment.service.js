const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');

async function createAssessment(data) {

    const { token, tinggiBadan, beratBadan, aktivitasHarian, faktor, karbohidrat, protein, lemak } = data;

    const verify = verifyToken(token)
    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        }
    }

    try {
        await prisma.assessment.create({
            data:{
                idUser: verify.idUser,
                tinggiBadan : Number(tinggiBadan),
                beratBadan : Number(beratBadan),
                aktivitasHarian: aktivitasHarian,
                faktor : faktor,
                karbohidrat : Number(karbohidrat),
                protein : Number(protein),
                lemak : Number(lemak)
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

const getAssessment = async (data) => {

    const { token } = data;

    const verify = verifyToken(token)

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        }
    }

    try {
        const assessment = await prisma.assessment.findMany({
            select: {
                idAssessment: true,
                idUser: true,
                tinggiBadan: true,
                beratBadan: true,
                aktivitasHarian: true,
                faktor: true,
                karbohidrat: true,
                protein: true,
                lemak: true,
                updated_at: true
            },
            where: {
                idUser: verify.idUser
            }
        });

        if (assessment.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Assessment not found",
                data: []
            }
        }

        return {
            status: 200,
            error: false,
            message: "Assassment has been found",
            data: assessment
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: "Cannot get assessment data",
            data: error.message
        };
    }
}

module.exports = {
    createAssessment,
    getAssessment
};
