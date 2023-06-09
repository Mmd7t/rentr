const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconfig.js");
let ReviewModel = sequelize.define("reviews", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    from_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    to_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { timestamps: false },);

module.exports = ReviewModel;