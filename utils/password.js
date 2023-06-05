import bcrypt from 'bcrypt';


export const hash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const compare = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);
