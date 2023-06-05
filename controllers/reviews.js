const responses = require('../helpers/responses.js');
const ReviewModel = require('../models/reviewModel.js');
const ProductReviewModel = require('../models/productReviewModel.js');



/*---- ADD REVIEW ----*/
const addReview = async (req, res) => {
    try {
        const { rating } = req.body;
        const data = {
            rating,
            from_id: req.userId,
            to_id: req.params.id,
        }
        const ExistingReviews = await ReviewModel.findOne({ where: { from_id: req.userId, to_id: to_id } });
        if (ExistingReviews) {
            const updatedReview = await ReviewModel.update({ rating: rating }, { where: { from_id: req.userId, to_id: to_id } });
            if (updatedReview) {
                return responses.success(res, 'Review Updated Successfully', updatedReview);
            } else {
                return responses.badRequest(res, 'Error While updating review');
            }
        } else {
            const newReview = await ReviewModel.create(data);
            if (newReview) {
                return responses.success(res, 'Review Added Successfully', newReview);
            } else {
                return responses.badRequest(res, 'Error Happened');
            }
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}


/*---- ADD PRODUCT REVIEW ----*/
const addProductReview = async (req, res) => {
    try {
        const { rating } = req.body;
        const data = {
            rating,
            from_id: req.userId,
            to_id: req.params.id,
        }
        const ExistingReviews = await ProductReviewModel.findOne({ where: { from_id: req.userId, to_id: to_id } });
        if (ExistingReviews) {
            const updatedReview = await ProductReviewModel.update({ rating: rating }, { where: { from_id: req.userId, to_id: to_id } });
            if (updatedReview) {
                return responses.success(res, 'Review Updated Successfully', updatedReview);
            } else {
                return responses.badRequest(res, 'Error While updating review');
            }
        } else {
            const newReview = await ProductReviewModel.create(data);
            if (newReview) {
                return responses.success(res, 'Review Added to product Successfully', newReview);
            } else {
                return responses.badRequest(res, 'Error Happened');
            }
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- GET REVIEWS ----*/
const getReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.findAll({ where: { to_id: req.params.id } });
        if (reviews) {
            const totalReview = reviews.map((review) => { return review.rating }).reduce((a, b) => a + b, 0);
            return responses.success(res, `Total of Ratings for id ${req.params.id}`, { totalReview });
        } else {
            return responses.badRequest(res, 'There is no rating yet');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

/*---- GET PRODUCT REVIEWS ----*/
const getProductReviews = async (req, res) => {
    try {
        const reviews = await ProductReviewModel.findAll({ where: { to_id: req.params.id } });
        if (reviews) {
            const totalReview = reviews.map((review) => { return review.rating }).reduce((a, b) => a + b, 0);
            return responses.success(res, `Total of Ratings for product id ${req.params.id}`, { totalReview });
        } else {
            return responses.badRequest(res, 'There is no rating yet');
        }
    } catch (error) {
        return responses.internalServerError(res);
    }
}

module.exports = {
    addReview, getReviews, getProductReviews, addProductReview
}