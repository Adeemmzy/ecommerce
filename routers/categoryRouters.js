const express = require('express');
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");


// Category router
router.post("/api/category",  categoryControllers.createCategory);
router.get("/api/category", categoryControllers.getCategory);

module.exports = router;