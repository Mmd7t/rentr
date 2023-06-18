const { sequelize } = require("../config/dbconfig.js");
const { Sequelize } = require('sequelize');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.requests = require('./requestsModel.js')
db.users = require('./userModel.js')
db.products = require('./productModel.js')
db.reviews = require('./reviewModel.js')
db.productReviews = require('./productReviewModel.js')

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })


// 1 to Many Relation
db.users.hasMany(db.requests, {
    foreignKey: 'user_id',
    as: 'userData'
})

db.requests.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'userData'
})

// 1 to Many Relation
db.products.hasMany(db.requests, {
    foreignKey: 'product_id',
    as: 'productRequests'
})

db.requests.belongsTo(db.products, {
    foreignKey: 'product_id',
    as: 'productRequests'
})



module.exports = db
