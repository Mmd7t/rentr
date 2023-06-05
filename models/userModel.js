const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig.js");
let UserModel = sequelize.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    otp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, { timestamps: true },);

module.exports = UserModel;