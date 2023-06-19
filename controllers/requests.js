// const { RequestsModel, UserModel } = require('../models/index.js');
const db = require('../models/index.js');
const responses = require('../helpers/responses.js');
const { sendMail } = require('../services/emailService.js');

const RequestsModel = db.requests;
const ProductModel = db.products;
const UserModel = db.users;


/*---- ADD REQUEST ----*/
const addRequest = async (req, res) => {
    try {
        const { start_booking, end_booking } = req.body;
        const data = {
            user_id: req.userId,
            product_id: req.params.id,
            start_booking,
            end_booking,
        }
        const request = await RequestsModel.create(data);
        if (request) {
            console.log(request);
            return responses.success(res, 'Request Added Successfully', request);
        } else {
            return responses.badRequest(res, 'Error while adding request, please try again');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- GET ALL REQUESTS----*/
const getAllRequests = async (req, res) => {
    try {
        const requests = await RequestsModel.findAll({
            include: [{ model: ProductModel, as: 'productRequests', where: { userId: req.userId } },
            { model: UserModel, as: 'userData' }],
        });
        if (requests) {
            console.log(requests);
            return responses.success(res, 'Requests', requests);
        } else {
            return responses.badRequest(res, 'Error while adding request, please try again');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res);

    }
}

/*---- ACCEPT REQUEST ----*/
const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (user) {
            // console.log(requests);
            const email = await sendMail({
                to: `${user.email}`,
                name: `${user.name}`,
                subject: `Your Request has been accepted`,
            });
            if (email) {
                return responses.success(res, 'Email has been sent to user');
            } else {
                return responses.success(res, 'Error while sending email to user');
            }
        } else {
            return responses.badRequest(res, 'Cannot find this user');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res);

    }
}

/*---- REFUSE REQUEST ----*/
const refuseRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (user) {
            // console.log(requests);
            const email = await sendMail({
                to: `${user.email}`,
                name: `${user.name}`,
                subject: `Your Request has been refused`,
            });
            if (email) {
                return responses.success(res, 'Email has been sent to user');
            } else {
                return responses.success(res, 'Error while sending email to user');
            }
        } else {
            return responses.badRequest(res, 'Cannot find this user');
        }
    } catch (error) {
        console.log(error);
        return responses.internalServerError(res);

    }
}


module.exports = {
    addRequest, getAllRequests, refuseRequest, acceptRequest
}