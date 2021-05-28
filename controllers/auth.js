import jwt from 'jsonwebtoken';

async function auth(req, res, next) {
    try {
        const token = req.cookies["auth-token"];
        if (!token) return res.redirect('/login');
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userId = verified;
        next();
    } catch {
    }
}

export default auth;
