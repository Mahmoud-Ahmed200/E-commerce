const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
router.patch("/editProfile", controller.editProfile);
router.get("/profile", controller.getProfile);
router.patch("/changePassword", controller.changePassword);
module.exports = router;
