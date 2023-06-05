const bcrypt = require('bcrypt');


const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const compare = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

module.exports = { hash, compare }