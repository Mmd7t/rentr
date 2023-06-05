const express = require("express");
const { addProduct, getProduct, getAllProducts, searchProducts } = require("../controllers/products.js");
const { verifyToken } = require('../middleware/auth.js');
const uploadImage = require('../services/uploadImage.js');

const router = express.Router();

router.post("/", [verifyToken, uploadImage], addProduct);
router.get("/get/:id", verifyToken, getProduct);
router.get("/", verifyToken, getAllProducts);
router.get("/search", verifyToken, searchProducts);

module.exports = router;