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

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);
    if (!user) {
      return next(new ErrorHandler("Job seeker not found", 404));
    }

    req.user = user; 
    next(); 
  } catch (error) {
    return next(new ErrorHandler("Invalid token, please log in again", 401));
  }
});


exports.isAuthenticatedEmployer = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const employerUser = await EmployerUser.findById(decodedData.id);
    
    if (!employerUser) {
      return next(new ErrorHandler("Employer not found", 404));
    }

    req.user = employerUser; 
    next(); 
  } catch (error) {
    return next(new ErrorHandler("Invalid token, please log in again", 401));
  }
});

