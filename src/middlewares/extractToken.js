const extractToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    req.token = authHeader && authHeader.split(' ')[1];
    next();
}

export default extractToken;