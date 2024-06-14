const prisma = require('../../helpers/prisma');
const { verifyToken } = require('../../middlewares/jwt');

async function getData(data) {

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
        const articles = await prisma.article.findMany();

        if (articles.length === 0) {
            return {
                status: 200,
                error: false,
                message: 'No article data found',
                data: articles,
            }
        }

        return {
            status: 200,
            error: false,
            message: 'Success get articles data',
            data: articles,
        }

    } catch (error) {
        return {
            status: 500,
            error: true,
            message: 'Error occurred while getting article data',
            data: error.message,
        }
    }
}

module.exports = {
    getData
}; 