const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig.js");
let RequestsModel = sequelize.define("requests", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_booking: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_booking: {
        type: DataTypes.DATE,
        allowNull: false
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, { timestamps: true },);

module.exports = RequestsModel;