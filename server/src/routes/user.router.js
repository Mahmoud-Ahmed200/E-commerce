const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const { uploadProfilePhoto } = require("../config/cloudinary");

router.get("/profile", controller.getProfile);
router.patch("/editProfile", controller.editProfile);
router.patch("/changePassword", controller.changePassword);
router.post(
  "/profile-photo",
  uploadProfilePhoto.single("photo"),
  controller.uploadProfilePhoto
);
router.delete("/profile-photo", controller.deleteProfilePhoto);

module.exports = router;
