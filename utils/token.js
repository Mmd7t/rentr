const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();

const generate = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

const decode = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.log(error);
    }
};

module.exports = { generate, decode }