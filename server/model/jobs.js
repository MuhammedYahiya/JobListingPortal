const mongoose = require("mongoose");
const validator = require("validator")
const { Schema } = mongoose;

const jobSchema = new Schema({
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Job posting date is required'],
      default: Date.now,
    },
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    qualification: {
      type: String,
      required: [true, 'Qualification is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
      trim: true,
    },
    responsibility: {
      type: String,
      required: [true, 'Responsibilities are required'],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, 'Salary information is required'],
      trim: true,
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
  
  
  jobSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  const Job = mongoose.model('Job', jobSchema);
  
  module.exports = Job;