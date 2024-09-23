const express = require("express");
const {
  registerJobSeeker,
  loginJobSeeker,
  updateProfile,
  getAllJobs,
  getJobById,
} = require("../controller/jobseekerController");
const { isAuthenticatedJobSeeker } = require("../middleware/auth");
const upload = require('../config/multerConfig'); 
const router = express.Router();

router.route("/jobseeker/register").post(registerJobSeeker);
router.route("/jobseeker/login").post(loginJobSeeker);
router.route("/jobseeker/update").put(isAuthenticatedJobSeeker, upload.single('profilePicture'), updateProfile)

router.route("/jobs").get(getAllJobs);
router.route("/job/:jobId").get(getJobById);

module.exports = router;
