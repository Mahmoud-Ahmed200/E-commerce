const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router.get("/:id", controller.getProductByID);
router.get("/", controller.getProductsByFilter);

module.exports = router;
