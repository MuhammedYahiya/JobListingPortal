const express = require("express");
const ErrorHandler = require("../utils/errorHandler");
const jobseekerModel = require("../model/jobseekerModel");
const jwt = require("jsonwebtoken");

const EmployerUser = require("../model/employerModel");
const {
  registerEmployer,
  loginEmployer,
  updateEmployerProfile,
  createJob,
  getEmployerJobs,
  editJob,
  getAppliedCandidates,
  updateApplicationStatus,
  deleteJob,
} = require("../controller/employerController");
const { isAuthenticatedEmployer } = require("../middleware/auth");
const upload = require("../config/multerConfig");
const router = express.Router();

router
  .route("/employer/register")
  .post(upload.single("profilePicture"), registerEmployer);
router.route("/employer/login").post(loginEmployer);
router
  .route("/employer/update")
  .put(
    isAuthenticatedEmployer,
    upload.single("profilePicture"),
    updateEmployerProfile
  );

router.route("/employer/job/create").post(isAuthenticatedEmployer, createJob);
router.route("/employer/job/edit/:jobId").put(isAuthenticatedEmployer, editJob);
router.route("/employer/jobs").get(isAuthenticatedEmployer, getEmployerJobs);

router
  .route("/employer/job/:jobId/candidates")
  .get(isAuthenticatedEmployer, getAppliedCandidates);
router
  .route("/employer/application/:applicationId/status")
  .put(isAuthenticatedEmployer, updateApplicationStatus);

router
  .route("/employer/job/delete/:jobId")
  .delete(isAuthenticatedEmployer, deleteJob); 

router.route("/verify-token").get(async (req, res, next) => {
  const { token } = req.cookies;

  console.log("token", token);
  console.log(process.env.JWT_SECRET);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    const employerUser = await EmployerUser.findById(decodedData.id);

    if (employerUser)
      return res.status(200).json({
        success: true,
        user: employerUser,
        type: "employer",
      });

    const jobSeekerUser = await jobseekerModel.findById(decodedData.id);

    if (jobSeekerUser)
      return res.status(200).json({
        success: true,
        user: jobSeekerUser,
        type: "jobSeeker",
      });

    return next(new ErrorHandler("Job seeker or employer id not found", 404));
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Invalid token, please log in again", 401));
  }
});

module.exports = router;
