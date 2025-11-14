const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");

router.post("/signup", controller.signUp);
router.post("/signin", controller.signIn);
router.post("/signout", controller.signOut);
router.get("/verifyemail", controller.validateEmail);
router.post("/forgotpassword", controller.forgotPassword);
router.patch("/resetpassword", controller.resetPassword);
router.post("/refreshtoken", controller.refreshToken);

module.exports = router;
