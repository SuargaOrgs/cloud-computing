const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');
const { formatDateText } = require('../../helpers/formatDate');

const getData = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const nutrition = await prisma.imageNutrition.findMany({
            where: { idUser: verify.idUser },
            select: {
                id: true,
                idUser: true,
                idMakanan: true,
                gambar: true,
                makanan: { select: { namaMakanan: true } },
                waktuMakan: true,
                created_at: true
            }
        });

        if (nutrition.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Data nutrition not found",
                data: []
            };
        }

        const formatData = nutrition.map((item) => ({
            id: item.id,
            idUser: item.idUser,
            gambar: item.gambar,
            namaMakanan: item.makanan.namaMakanan,
            keterangan: item.waktuMakan + " | " + formatDateText(item.created_at),
            created_at: item.created_at
        })).sort((a, b) => b.created_at - a.created_at);

        return {
            status: 200,
            error: false,
            message: "Data nutrition has been found",
            data: formatData
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Data nutrition gagal diambil',
            data: error.message
        };
    }
};

const detailData = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const nutrition = await prisma.imageNutrition.findMany({
            where: { idUser: verify.idUser },
            select: {
                id: true,
                idUser: true,
                idMakanan: true,
                gambar: true,
                waktuMakan: true,
                makanan: {
                    select: {
                        namaMakanan: true,
                        karbohidrat: true,
                        lemak: true,
                        protein: true,
                    }
                },
                updated_at: true,
                created_at: true,
            }
        });

        if (nutrition.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Detail nutrition not found",
                data: []
            };
        }

        const formatData = nutrition.map((item) => ({
            id: item.id,
            idUser: item.idUser,
            idMakanan: item.idMakanan,
            gambar: item.gambar,
            waktuMakan: item.waktuMakan,
            namaMakanan: item.makanan.namaMakanan,
            karbohidrat: item.makanan.karbohidrat,
            lemak: item.makanan.lemak,
            protein: item.makanan.protein,
            update_at: item.updated_at,
            created_at: item.created_at
        })).sort((a, b) => b.created_at - a.created_at);

        return {
            status: 200,
            error: false,
            message: "Detail nutrition has been found",
            data: formatData
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Detail nutrition gagal diambil',
            data: error.message
        };
    }
};

const saveImageNutrition = async (data) => {
    const { token, linkGambar, namaAktivitas, waktuMakan, idMakanan, porsi } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const imageNutrition = await prisma.imageNutrition.create({
            data: {
                idUser: verify.idUser,
                idMakanan,
                NamaAktivitas: namaAktivitas,
                gambar: linkGambar,
                waktuMakan,
                porsi : parseInt(porsi)
            }
        });

        return {
            status: 201,
            error: false,
            message: "Image nutrition data has been saved",
            data: imageNutrition
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Failed to save image nutrition data',
            data: error.message
        };
    }
};

const getFoodStorage = async (data) => {
    const { token } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {
        const foodStorage = await prisma.foodStorage.findMany();

        if (foodStorage.length === 0) {
            return {
                status: 404,
                error: false,
                message: "Food storage not found",
                data: []
            };
        }

        return {
            status: 200,
            error: false,
            message: "Food storage data has been found",
            data: foodStorage
        };
    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Failed to retrieve food storage data',
            data: error.message
        };
    }
};

module.exports = {
    getData,
    detailData,
    saveImageNutrition,
    getFoodStorage
};
