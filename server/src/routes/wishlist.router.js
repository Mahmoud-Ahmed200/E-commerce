const express = require("express");
const router = express.Router();
const controller = require("../controllers/wishlist.controller");
router.get("/", controller.getWishlist);
router.post("/", controller.addToWishlist);
router.delete("/:productId", controller.removeFromWishlist);
module.exports = router;
