const express = require("express");
const {
  registerEmployer,
  loginEmployer,
} = require("../controller/employerController");

const router = express.Router();

router.route("/employer/register").post(registerEmployer);
router.route("/employer/login").post(loginEmployer);

module.exports = router;
