const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/jobseekerModel");
const EmployerUser = require("../model/employerModel");

exports.isAuthenticatedJobSeeker = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user =
    (await User.findById(decodedData.id)) ||
    (await EmployerUser.findById(decodedData.id));
    
  next();
});
