const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');

async function editData(data) {

    const { token, namaLengkap, email, tanggalAwalHamil } = data;

    const verify = verifyToken(token);

    if (!verify) {
        return {
            status: 401,
            error: true,
            message: "Session has expired, please login again!!"
        };
    }

    try {

        const data = {
            namaLengkap : namaLengkap ? namaLengkap : undefined,
            email : email ? email.toLowerCase() : undefined,
            tanggalKehamilan : tanggalAwalHamil ? new Date(tanggalAwalHamil) : undefined,
        }

        await prisma.user.update({
            where: {
                idUser : verify.idUser
            },
            data: data
        });

        return {
            status: 200,
            error: false,
            message: 'Success updating profile data',
            data: {
                ...data
            }
        }

    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Profile data failed to update',
            data: error.message,
        }
    }

}

module.exports = {
    editData
};