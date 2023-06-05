import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { dialect: "mysql" })
// export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, { dialect: "mysql", host: 'http://rentr.click/' })

export function init() {
    //checking if connection is done
    sequelize.authenticate().then(() => {
        console.log(`Database connected to rntr`)
    }).catch((err) => {
        console.log(err)
    })
}
