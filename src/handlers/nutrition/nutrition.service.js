const { formatDateText } = require('../../helpers/formatDate');
const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');

const getData = async (data) => {

    const { token } = data

    const verify = verifyToken(token)

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Token not valid"
        }
    }

    try {

        const nutrition = await prisma.imageNutrition.findMany({
            where: {
                idUser: verify.idUser
            },
            select: {
                id: true,
                idUser: true,
                idMakanan: true,
                gambar: true,
                makanan: {
                    select: {
                        namaMakanan: true
                    }
                },
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
            }
        }

        const formatData = nutrition.map((item) => {
            return {
                id: item.id,
                idUser: item.idUser,
                gambar: item.gambar,
                namaMakanan: item.makanan.namaMakanan,
                keterangan: item.waktuMakan + " | " + formatDateText(item.created_at),
                created_at: item.created_at
            }
        }).sort((a, b) => b.created_at - a.created_at);
        
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
}

const detailData = async (data) => {

    const { token } = data;

    const verify = verifyToken(token)

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Token not valid"
        }
        
    }

    try {

        const nutrition = await prisma.imageNutrition.findMany({
            where: {
                idUser: verify.idUser
            },
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
            }
        }

        const formatData = nutrition.map((item) => {
            return {
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
            }
        }).sort((a, b) => b.created_at - a.created_at);

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

}

module.exports = {
    getData,
    detailData
}