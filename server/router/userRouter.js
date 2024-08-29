const express = require("express");
const {
  registerEmployer,
  loginEmployer,
  registerJobSeeker,
  loginJobSeeker,
} = require("../controller/userController");
const router = express.Router();

router.route("/employer/register").post(registerEmployer);
router.route("/employer/login").post(loginEmployer);
router.route("/jobseeker/register").post(registerJobSeeker);
router.route("/jobseeker/login").post(loginJobSeeker);

module.exports = router;
