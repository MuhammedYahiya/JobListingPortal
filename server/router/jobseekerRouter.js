const express = require("express");
const {
  registerJobSeeker,
  loginJobSeeker,
  updateProfile,
  getAllJobs,
  getJobById,
  applyForJob,
  getAppliedJobs,
} = require("../controller/jobseekerController");
const { isAuthenticatedJobSeeker } = require("../middleware/auth");
const upload = require('../config/multerConfig'); 
const router = express.Router();

router.route("/jobseeker/register").post(registerJobSeeker);
router.route("/jobseeker/login").post(loginJobSeeker);
router.route("/jobseeker/update").put(isAuthenticatedJobSeeker, upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), updateProfile)

router.route("/jobs").get(isAuthenticatedJobSeeker,getAllJobs);
router.route("/job/:jobId").get(isAuthenticatedJobSeeker,getJobById);

router.route("/jobseeker/job/:jobId/apply").post(isAuthenticatedJobSeeker, upload.single('resume'), applyForJob);
router.route("/jobseeker/applications").get(isAuthenticatedJobSeeker, getAppliedJobs);

module.exports = router;
