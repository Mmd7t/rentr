import express from "express";
import { addProduct, getProduct, getAllProducts, searchProducts } from "../controllers/products.js";
import { verifyToken } from '../middleware/auth.js';
import uploadImage from '../services/uploadImage.js';

const router = express.Router();

router.post("/", [verifyToken, uploadImage], addProduct);
router.get("/get/:id", verifyToken, getProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/search", verifyToken, searchProducts);

export default router;