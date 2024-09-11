const paymentControllers = require("../controllers/paymentControllers")
const express = require('express');
router = express.Router();
const { auth } = require("../middleware/auth");


router.post("/api/product/initiate", auth,  paymentControllers.initiatepayment)
router.post("/api/product/verify", auth,  paymentControllers.verifyPayment)


module.exports = router