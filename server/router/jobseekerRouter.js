const express = require("express");
const {
  registerJobSeeker,
  loginJobSeeker,
  updateProfile,
} = require("../controller/jobseekerController");
const { isAuthenticatedUser } = require("../middleware/auth");
const upload = require('../config/multerConfig'); 
const router = express.Router();

router.route("/jobseeker/register").post(registerJobSeeker);
router.route("/jobseeker/login").post(loginJobSeeker);
router.route("/jobseeker/update").put(isAuthenticatedUser, upload.single('profilePicture'), updateProfile)

module.exports = router;
