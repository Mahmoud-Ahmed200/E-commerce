const users = require("../models/user.model");

const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    return res
      .status(200)
      .json({ message: "Profile fetched successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const editProfile = async (req, res) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = req.user;
    if (user.fullName === fullName) {
      return res.status(200).json({ message: "No changes happen", user });
    }
    await users.updateOne({ _id: user._id }, { $set: { fullName } });
    user.fullName = fullName;
    return res
      .status(200)
      .json({ message: "User attributes updated successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword, newPasswordConfirmation } = req.body;

    if (!oldPassword || !newPassword || !newPasswordConfirmation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (newPassword !== newPasswordConfirmation) {
      return res.status(400).json({ message: "New password does not match" });
    }

    const userDb = await users.findById(user.id).select("+password");
    const checkPassword = await userDb.comparePassword(oldPassword);
    if (!checkPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const checkSamePassword = await userDb.comparePassword(newPassword);
    if (checkSamePassword) {
      return res
        .status(400)
        .json({ message: "New password cannot be the same as old password" });
    }
    userDb.password = newPassword;
    await userDb.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = req.user;
    const oldPhotoPublicId = user.profilePhoto?.publicId;

  
    user.profilePhoto = {
      url: req.file.path,
      publicId: req.file.filename,
    };
    await user.save();

   
    if (oldPhotoPublicId) {
      const { deleteImage } = require("../config/cloudinary");
      await deleteImage(oldPhotoPublicId);
    }

    return res.status(200).json({
      message: "Profile photo updated successfully",
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProfilePhoto = async (req, res) => {
  try {
    const user = req.user;

    if (!user.profilePhoto) {
      return res.status(400).json({ message: "No profile photo to delete" });
    }

    const { deleteImage } = require("../config/cloudinary");
    await deleteImage(user.profilePhoto.publicId);

    user.profilePhoto = undefined;
    await user.save();

    return res.status(200).json({
      message: "Profile photo deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getProfile,
  editProfile,
  changePassword,
  uploadProfilePhoto,
  deleteProfilePhoto,
};
