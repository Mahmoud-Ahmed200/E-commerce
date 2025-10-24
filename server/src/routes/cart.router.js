const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");
router.get("/", controller.getCart);
router.post("/", controller.addCartItem);
router.put("/product/:productId", controller.updateProductQuantity);
router.delete("/product/:productId", controller.deleteProduct);
router.delete("/", controller.clearCart);
module.exports = router;
