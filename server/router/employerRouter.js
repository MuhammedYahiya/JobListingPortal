const express = require("express");
const {
  registerEmployer,
  loginEmployer,
  updateEmployerProfile,
  createJob,
  getEmployerJobs,
  editJob,
  getAppliedCandidates,
  updateApplicationStatus,
} = require("../controller/employerController");
const { isAuthenticatedEmployer } = require("../middleware/auth");
const upload = require('../config/multerConfig');
const router = express.Router();

router.route("/employer/register").post(upload.single('profilePicture'), registerEmployer);
router.route("/employer/login").post(loginEmployer);
router.route("/employer/update").put(isAuthenticatedEmployer,upload.single('profilePicture'), updateEmployerProfile);

router.route("/employer/job/create").post(isAuthenticatedEmployer, createJob);
router.route("/employer/job/edit/:jobId").put(isAuthenticatedEmployer, editJob);
router.route("/employer/jobs").get(isAuthenticatedEmployer, getEmployerJobs);

router.route("/employer/job/:jobId/candidates").get(isAuthenticatedEmployer, getAppliedCandidates);
router.route("/employer/application/:applicationId/status").put(isAuthenticatedEmployer, updateApplicationStatus);

router.route("/employer/verify-token").get(isAuthenticatedEmployer, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});


module.exports = router;
