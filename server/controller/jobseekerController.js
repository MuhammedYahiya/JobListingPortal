const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const jobseeker = require("../model/jobseekerModel");
const Job = require('../model/jobs');
const Application = require('../model/application');

exports.registerJobSeeker = async (req, res) => {
  try {
    const existingUser = await jobseeker.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email id is already existing" });
    }

    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password should be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new jobseeker({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      password: hashPassword,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      socialMediaLink: req.body.socialMediaLink,
      jobtitlename: req.body.jobtitlename,
      experience: req.body.experience,
      positionType: req.body.positionType,
    });

    await newUser.save();
    sendToken(newUser, 200, res);
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({ error: errors });
    }

    res.status(500).json({ error: "Internal Server error" });
  }
};

exports.loginJobSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await jobseeker.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
    console.log(error);
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = {};

    // Only add fields to updateData if they exist in req.body
    const fields = [
      'email', 'age', 'address', 'jobtitlename', 'city', 'state', 
      'country', 'pincode', 'positionType', 'socialMediaLink'
    ];
    
    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (req.body.skills) {
      try {
        const skillsArray = JSON.parse(req.body.skills);
        if (Array.isArray(skillsArray)) {
          updateData.skills = skillsArray;
        }
      } catch (e) {
        console.error('Error parsing skills:', e);
      }
    }

    // Handle file uploads only if files are present
    if (req.files) {
      if (req.files.profilePicture) {
        const result = await cloudinary.uploader.upload(req.files.profilePicture[0].path);
        updateData.profilePicture = result.secure_url;
        fs.unlinkSync(req.files.profilePicture[0].path);
      }
      
      if (req.files.resume) {
        const resumeResult = await cloudinary.uploader.upload(
          req.files.resume[0].path,
          { resource_type: "raw" }
        );
        updateData.resume = resumeResult.secure_url;
        fs.unlinkSync(req.files.resume[0].path);
      }
    }

    // If no updates are needed, return current user data
    if (Object.keys(updateData).length === 0) {
      const currentUser = await jobseeker.findById(userId);
      return res.status(200).json({
        success: true,
        message: "No changes detected",
        jobseeker: currentUser
      });
    }

    // Perform update
    const updatedJobseeker = await jobseeker.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJobseeker) {
      return res.status(404).json({
        success: false,
        message: "Jobseeker not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      jobseeker: updatedJobseeker,
    });
    
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name companyName');
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('employer', 'name companyName');
    if (!job) {
      return res.status(404).json({ success: false, error: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const existingApplication = await Application.findOne({
      job: req.params.jobId,
      jobseeker: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, error: 'You have already applied for this job' });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      
      resource_type: 'auto', // Automatically determine the resource type
    });
      console.log(result);
    // Create the application with the Cloudinary URL
    const application = await Application.create({
      job: req.params.jobId,
      jobseeker: req.user._id,
      resume: result.secure_url // Get the URL from the Cloudinary response
    });

    // Optionally, delete the local file after uploading
    fs.unlinkSync(req.file.path);

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ jobseeker: req.user._id })
      .populate('job', 'title companyName location');
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};