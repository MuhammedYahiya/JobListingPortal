const express = require("express");
const {
  registerJobSeeker,
  loginJobSeeker,
} = require("../controller/jobseekerController");
const router = express.Router();

router.route("/jobseeker/register").post(registerJobSeeker);
router.route("/jobseeker/login").post(loginJobSeeker);

module.exports = router;
