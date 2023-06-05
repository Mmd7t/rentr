import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generate = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const decode = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.log(error);
    }
};
