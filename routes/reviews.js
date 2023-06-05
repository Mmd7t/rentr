import express from "express";
import { addReview, getReviews, getProductReviews, addProductReview } from "../controllers/reviews.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/:id", verifyToken, addReview);
router.get("/:id", verifyToken, getReviews);
router.post("/product/:id", verifyToken, addProductReview);
router.get("/product/:id", verifyToken, getProductReviews);

export default router;