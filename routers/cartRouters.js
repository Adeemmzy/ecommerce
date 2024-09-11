const express = require('express');
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");
const { auth } = require('../middleware/auth');

router.post("/api/add-to-cart", auth, cartControllers.addTocart);
router.get("/api/cart", auth, cartControllers.getCart);
router.put("/api/update-cart", auth, cartControllers.updateCart);
router.delete("/api/delete-cart", auth, cartControllers.deleteCartItem);

module.exports = router;