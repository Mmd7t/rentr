const express = require("express");
const { addReview, getReviews, getProductReviews, addProductReview } = require("../controllers/reviews.js");
const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

router.post("/:id", verifyToken, addReview);
router.get("/:id", verifyToken, getReviews);
router.post("/product/:id", verifyToken, addProductReview);
router.get("/product/:id", verifyToken, getProductReviews);

module.exports = router;