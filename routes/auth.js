const express = require("express");
const { login, register, sendOTP, verifyEmail, changeUserData, getUserData, changePassword, resetPassword, changeProfileImage } = require("../controllers/auth.js");
const { verifyToken } = require('../middleware/auth.js');
const uploadImage = require('../services/uploadImage.js');


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/send-otp", sendOTP);
router.post("/verify-email", verifyEmail);
router.patch("/user", verifyToken, changeUserData);
router.get("/user", verifyToken, getUserData);
router.patch("/profile-image", [verifyToken, uploadImage], changeProfileImage);
router.post("/reset-password", resetPassword);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;