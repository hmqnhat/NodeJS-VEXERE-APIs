const express = require("express");
const userService = require("../services/user.service");
const { authenticate, authorization } = require("../middlewares/auth/index");
const { uploadImage } = require("../middlewares/images/index");
const {
  validateCreateUser,
} = require("../validation/user/create-user.validation");

const router = express.Router();

router.post("/users", validateCreateUser, userService.createUser);
router.post("/login", userService.login);
router.patch("/update-password", userService.updatePassword);
router.get(
  "/me",
  authenticate,
  authorization(["Member", "Admin"]),
  userService.getMe
);
router.post(
  "/upload-avatar",
  authenticate,
  authorization(["Member", "Admin"]),
  uploadImage("trip"),
  userService.uploadAvatar
);

module.exports = router;
