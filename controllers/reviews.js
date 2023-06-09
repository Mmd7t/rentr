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
        const ExistingReviews = await ReviewModel.findOne({ where: { from_id: req.userId, to_id: req.params.id } });
        if (ExistingReviews) {
            const updatedReview = await ReviewModel.update({ rating: rating }, { where: { from_id: req.userId, to_id: req.params.id } });
            if (updatedReview) {
                const review = await ReviewModel.findOne({ where: { from_id: req.userId, to_id: req.params.id } });
                return responses.success(res, 'Review Added Successfully', review);
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
        console.log(error);
        return responses.internalServerError(res, error);
    }
}


/*---- ADD PRODUCT REVIEW ----*/
const addProductReview = async (req, res) => {
    try {
        const { rating, review } = req.body;
        const data = {
            rating,
            review,
            from_id: req.userId,
            to_id: req.params.id,
        }
        const ExistingReviews = await ProductReviewModel.findOne({ where: { from_id: req.userId, to_id: req.params.id } });
        if (ExistingReviews) {
            const updatedReview = await ProductReviewModel.update({ rating: rating, review: review }, { where: { from_id: req.userId, to_id: req.params.id } });
            if (updatedReview) {
                const review = await ReviewModel.findOne({ where: { from_id: req.userId, to_id: req.params.id } });
                return responses.success(res, 'Review Added Successfully', review);
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
        return responses.internalServerError(res, error);
    }
}

/*---- GET REVIEWS ----*/
const getReviews = async (req, res) => {
    try {
        const reviews = await ReviewModel.findAll({ where: { to_id: req.params.id } });
        if (reviews) {
            const totalReview = reviews.map((review) => { return review.rating }).reduce((a, b) => a + b, 0);
            const numberOfRatings = reviews.map((review) => { return review.rating }).length;
            return responses.success(res, `Total of Ratings for id ${req.params.id}`, { totalReview, numberOfRatings });
        } else {
            return responses.badRequest(res, 'There is no rating yet');
        }
    } catch (error) {
        return responses.internalServerError(res, error);
    }
}

/*---- GET PRODUCT REVIEWS ----*/
const getProductReviews = async (req, res) => {
    try {
        const reviews = await ProductReviewModel.findAll({ where: { to_id: req.params.id } });
        if (reviews) {
            const totalReview = reviews.map((review) => { return review.rating }).reduce((a, b) => a + b, 0);
            return responses.success(res, `Total of Ratings for product id ${req.params.id}`, { totalReview, reviews });
        } else {
            return responses.badRequest(res, 'There is no rating yet');
        }
    } catch (error) {
        return responses.internalServerError(res, error);
    }
}

module.exports = {
    addReview, getReviews, getProductReviews, addProductReview
}