const mongoose = require("mongoose");
const validator = require("validator")
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');


const jobseekerSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [8, 'Password should be at least 8 characters']
    },
    
    address: {
      type: String,
      trim: true,
    },
    jobtitlename: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    positionType: {
      type: String,
      trim: true,
    },
    socialMediaLink: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
      trim: true,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  jobseekerSchema.pre('save', function(next) {
      this.updatedAt = Date.now();
      next();
  });

  jobseekerSchema.methods.getJWTToken = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
      expiresIn:process.env.JWT_EXPIRE,
    });
  };

  const jobseeker = mongoose.model('jobseeker',jobseekerSchema)

  module.exports = jobseeker