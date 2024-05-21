const prisma = require('../../helpers/prisma');
const { hashPassword, comparePassword } = require('../../middlewares/bcrypt');
const { generateAccessToken } = require('../../middlewares/jwt');

const login = async (email, password) => {
    const user = await prisma.user.findFirst({
        select: {
            idUser: true,
            email: true,
            password: true,
            namaLengkap: true,
            tanggalLahir: true,
            tanggalKehamilan: true,
        },
        where: {
            email: email,
        }
    });

    if (!user) {
        return {
            status: 404,
            error: true,
            message: "Account not found!"
        }
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
        return {
            status: 401,
            error: true,
            message: "Password is incorrect!"
        }
    }

    const data = {
        idUser: user.idUser,
        email: user.email,
        namaLengkap: user.namaLengkap,
        tanggalLahir: user.tanggalLahir,
        tanggalKehamilan: user.tanggalKehamilan,
    }

    return {
        status: 200,
        error: false,
        message: "Login successful!",
        data: {
            ...data,
            token: generateAccessToken(data)
        }
    }
}

const register = async (email, password, fullName, birthday, pregnancyDate) => {
    
    const hasAccount = await prisma.user.findFirst({
        select: {
            email: true
        },
        where: {
            email: email,
        }
    });

    if (hasAccount) {
        return {
            status: 400,
            error: true,
            message: "Email already exists!"
        }
    }

    const hash = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hash,
            namaLengkap: fullName,
            tanggalLahir: new Date(birthday),
            tanggalKehamilan: new Date(pregnancyDate),
        }
    });

    const data = {
        idUser: newUser.idUser,
        email: newUser.email,
        namaLengkap: newUser.namaLengkap,
        tanggalLahir: newUser.tanggalLahir,
        tanggalKehamilan: newUser.tanggalKehamilan,
    }

    return {
        status: 201,
        error: false,
        message: "User registered successfully!",
        data: {
            ...data,
            token: generateAccessToken(data)
        }
    }


}

module.exports = { 
    login,
    register
};