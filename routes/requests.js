const express = require("express");
const { addRequest, getAllRequests, acceptRequest, refuseRequest } = require("../controllers/requests.js");
const { verifyToken } = require('../middleware/auth.js');

const router = express.Router();

router.post("/:id", verifyToken, addRequest);
router.get("/", verifyToken, getAllRequests);
router.post("/accept/:id", verifyToken, acceptRequest);
router.post("/refuse/:id", verifyToken, refuseRequest);

module.exports = router;