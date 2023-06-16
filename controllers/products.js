const ProductModel = require('../models/productModel.js');
const UserModel = require('../models/userModel.js');
const responses = require('../helpers/responses.js');
const { Sequelize } = require('sequelize');



/*---- ADD PRODUCT ----*/
const addProduct = async (req, res) => {
    try {
        const { name, description, price, latitude, longitude, startBooking, endBooking } = req.body;
        const image = 'http://127.0.0.1:3000/images/' + req.file.filename;

        const data = {
            name,
            description,
            price,
            latitude,
            longitude,
            startBooking,
            endBooking,
            image,
            userId: req.userId,
        }
        const product = await ProductModel.create(data);
        console.log(product);
        return responses.success(res, 'Product Added Successfully', product);

    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- GET PRODUCT ----*/
const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ where: { id: req.params.id } });
        if (product) {
            return responses.success(res, `Product id ${req.params.id}`, product);
        } else {
            return responses.badRequest(res, 'Cannot get the product');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}


/*---- GET ALL PRODUCTS ----*/
const getAllProducts = async (req, res) => {
    try {
        const user = await UserModel.findOne({ where: { id: req.userId } });
        if (user) {
            const products = await ProductModel.findAll();
            let data = []
            if (products) {
                products.forEach((item) => {
                    const distance = getDistanceFromLatLonInKm(user.latitude, user.longitude, item.latitude, item.longitude);
                    data.push({ item, distance });
                });
                data.sort((a, b) => {
                    return a.distance - b.distance;
                });
                return responses.success(res, `Product id ${req.params.id}`, data);
            } else {
                return responses.badRequest(res, 'cannot get products');
            }
        } else {
            return responses.badRequest(res, 'User does not Exist');
        }

    } catch (error) {
        return responses.internalServerError(res);
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c) * 1000;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}



/*---- SEARCH PRODUCTS ----*/
const searchProducts = async (req, res) => {
    try {
        const Op = Sequelize.Op;
        const products = await ProductModel.findAll({ where: { name: { [Op.like]: `%${req.query.name}%` } } });
        if (products) {
            return responses.success(res, 'Products', products);
        } else {
            return responses.badRequest(res, 'Error happened');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

module.exports = {
    addProduct, getProduct, getAllProducts, searchProducts
}