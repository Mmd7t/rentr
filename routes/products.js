const express = require("express");
const { addProduct, getAllCategories, getProductsByCategoryId, getProduct, getAllProducts, searchProducts } = require("../controllers/products.js");
const { verifyToken } = require('../middleware/auth.js');
const { uploadMulti } = require('../services/uploadImage.js');

const router = express.Router();

router.post("/", [verifyToken, uploadMulti], addProduct);
router.get("/get/:id", verifyToken, getProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/categories", verifyToken, getAllCategories);
router.get("/category/:id", verifyToken, getProductsByCategoryId);
router.get("/search", verifyToken, searchProducts);

module.exports = router;