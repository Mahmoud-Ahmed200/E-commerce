const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");

router.post("/", controller.createOrder);
router.get("/", controller.getOrders);
router.get("/:orderId", controller.getOrderById);
router.patch("/:orderId/cancel", controller.cancelOrder);

module.exports = router;
