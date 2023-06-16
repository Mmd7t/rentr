const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { dialect: "mysql" })

function init() {
    //checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to rntr`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = { sequelize, init }