const UserModel = require('../models/userModel.js');
const ProductModel = require('../models/productModel.js');
const CategoryModel = require('../models/categoryModel.js');
const responses = require('../helpers/responses.js');
const { Sequelize } = require('sequelize');

/*---- ADD PRODUCT ----*/
const addProduct = async (req, res) => {
    try {
        const { name, description, price, latitude, longitude, startBooking, endBooking, category_id } = req.body;
        // const image = 'http://127.0.0.1:3000/images/' + req.files[0].filename;
        const image = 'https://api.rentr.click/images/' + req.files[0].filename;
        let images = [];
        console.log(req.files);
        for (let i = 0; i < req.files.length; i++) {
            images.push('https://api.rentr.click/images/' + req.files[i].filename);
        }
        const data = {
            name,
            description,
            price,
            latitude,
            longitude,
            startBooking,
            endBooking,
            image,
            images: `${images}`,
            userId: req.userId,
            category_id,
        }
        const product = await ProductModel.create(data);
        console.log(product);
        return responses.success(res, 'Product Added Successfully', product);
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res, error);
    }
}

/*---- GET PRODUCT ----*/
const getProduct = async (req, res) => {
    try {
        const product = await ProductModel.findOne({ where: { id: req.params.id } });
        if (product) {
            const category = await CategoryModel.findOne({ where: { id: product.category_id } });
            return responses.success(res, `Product id ${req.params.id}`, {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                latitude: product.latitude,
                longitude: product.longitude,
                startBooking: product.startBooking,
                endBooking: product.endBooking,
                image: product.image,
                images: [...product.images.split(",")],
                category: category,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            });
        } else {
            return responses.badRequest(res, 'Cannot get the product');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res, error);
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
                return responses.success(res, `All Products`, data);
            } else {
                return responses.badRequest(res, 'cannot get products');
            }
        } else {
            return responses.badRequest(res, 'User does not Exist');
        }

    } catch (error) {
        return responses.internalServerError(res, error);
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
        return responses.internalServerError(res, error);
    }
}


/*---- GET ALL CATEGORIES ----*/
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.findAll();
        if (categories) {
            return responses.success(res, 'Categories', categories);
        } else {
            return responses.badRequest(res, 'Error happened');
        }
    } catch (error) {
        return responses.internalServerError(res, error);
    }
}

/*---- GET PRODUCTS BY CATEGORY ID ----*/
const getProductsByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await ProductModel.findAll({ where: { category_id: id } })
        if (products) {
            return responses.success(res, 'Products', products);
        } else {
            return responses.badRequest(res, 'Error happened');
        }
    } catch (error) {
        return responses.internalServerError(res, error);
    }
}

module.exports = {
    addProduct, getProduct, getAllProducts, searchProducts, getAllCategories, getProductsByCategoryId
}