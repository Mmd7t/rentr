import { decode } from '../utils/token.js';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = decode(token);
        req.userId = verified.id;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}