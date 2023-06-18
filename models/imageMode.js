const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig.js");
let ImageModel = sequelize.define("images", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    product_is: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, { timestamps: false },);

module.exports = ImageModel;