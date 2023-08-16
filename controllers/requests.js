// const { RequestsModel, UserModel } = require('../models/index.js');
const db = require('../models/index.js');
const responses = require('../helpers/responses.js');
const { sendMail } = require('../services/emailService.js');
const FCM = require('../config/firebaseConfig.js')

const RequestsModel = db.requests;
const ProductModel = db.products;
const UserModel = db.users;

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};


/*---- ADD REQUEST ----*/
const addRequest = async (req, res) => {
    try {
        const { start_booking, end_booking, note } = req.body;
        const data = {
            user_id: req.userId,
            product_id: req.params.id,
            start_booking,
            end_booking,
            note
        }
        const request = await RequestsModel.create(data);
        const product = await ProductModel.findByPk(req.params.id);
        const user = await UserModel.findByPk(product.userId);
        if (request) {
            let message = {
                notification: {
                    title: "Test Notification",
                    body: "Notification body",
                },
                data: {
                    orderId: "123456",
                    orderDate: "2023-8-16",
                },
                token: user.device_token,
            };
            FCM.send(message, function (err, resp) {
                if (err) {
                    return responses.internalServerError(res, err);
                } else {
                    return responses.success(res, "Notification Sent");
                }
            })
        } else {
            return responses.badRequest(res, 'Error while adding request, please try again');
        }
    } catch (error) {
        return responses.internalServerError(res, error);
    }
}

/*---- GET ALL REQUESTS----*/
const getAllRequests = async (req, res) => {
    try {
        const requests = await RequestsModel.findAll({
            include: [{ model: ProductModel, as: 'productRequests', where: { userId: req.userId } },
            { model: UserModel, as: 'userData' }],
            order: [
                ['id', 'DESC']
            ],
        });
        if (requests) {
            console.log(requests);
            return responses.success(res, 'Requests', requests);
        } else {
            return responses.badRequest(res, 'Error while adding request, please try again');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res, error);

    }
}

/*---- ACCEPT REQUEST ----*/
const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await RequestsModel.findByPk(id);
        const user = await UserModel.findByPk(request.user_id);
        const product = await ProductModel.findByPk(request.product_id);
        if (user) {
            // console.log(requests);
            const email = await sendMail({
                to: `${user.email}`,
                name: `${user.name}`,
                subject: `Your Request to Product "${product.name}" has been accepted`,
            });
            if (email) {
                await RequestsModel.destroy({ where: { id: id } });
                return responses.success(res, 'Email has been sent to user');
            } else {
                return responses.success(res, 'Error while sending email to user');
            }
        } else {
            return responses.badRequest(res, 'Cannot find this user');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res, error);

    }
}

/*---- REFUSE REQUEST ----*/
const refuseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await RequestsModel.findByPk(id);
        const user = await UserModel.findByPk(request.user_id);
        const product = await ProductModel.findByPk(request.product_id);
        if (user) {
            // console.log(requests);
            const email = await sendMail({
                to: `${user.email}`,
                name: `${user.name}`,
                subject: `Your Request to Product "${product.name}" has been refused`,
            });
            if (email) {
                await RequestsModel.destroy({ where: { id: id } });
                return responses.success(res, 'Email has been sent to user');
            } else {
                return responses.success(res, 'Error while sending email to user');
            }
        } else {
            return responses.badRequest(res, 'Cannot find this user');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res, error);

    }
}


module.exports = {
    addRequest, getAllRequests, refuseRequest, acceptRequest
}