const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig.js");
let CategoryModel = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name_ar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name_en: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { timestamps: false },);

module.exports = CategoryModel;