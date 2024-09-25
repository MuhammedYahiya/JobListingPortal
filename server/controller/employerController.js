const employer = require("../model/employerModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const sendToken = require("../utils/jwtToken");
const Job = require("../model/jobs");
const Application = require("../model/application");

exports.registerEmployer = async (req, res) => {
  try {
    const existingUser = await employer.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password should be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    // let profilePictureUrl = null;
    // if (req.file) {
    //   try {
    //     const result = await cloudinary.uploader.upload(req.file.path);
    //     profilePictureUrl = result.secure_url;
    //     fs.unlinkSync(req.file.path);
    //   } catch (cloudinaryError) {
    //     return res.status(500).json({ error: "Error uploading profile picture" });
    //   }
    // }

    let profilePictureUrl = null;
    if (req.body.profilePicture) {
      // Handling Base64 image data
      try {
        const result = await cloudinary.uploader.upload(
          req.body.profilePicture,
          {
            upload_preset: "ml_default", // Or your preset for Cloudinary
          }
        );
        profilePictureUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.log(cloudinaryError);
        return res
          .status(500)
          .json({ error: "Error uploading profile picture" });
      }
    }

    const newUser = new employer({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      companyName: req.body.companyName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      pincode: req.body.pincode,
      positionType: req.body.positionType,
      socialMediaLink: req.body.socialMediaLink,
      hiringManager: req.body.hiringManager,
      phone: req.body.phone,
      employees: req.body.employees,
      profilePicture: profilePictureUrl,
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

exports.loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await employer.findOne({ email });
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
  }
};

exports.updateEmployerProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      email,
      companyName,
      address,
      city,
      state,
      country,
      pincode,
      positionType,
      socialMediaLink,
      hiringManager,
      phone,
      employees,
    } = req.body;

    const profilePicture = req.file;

    let updateData = {
      email,
      companyName,
      address,
      city,
      state,
      country,
      pincode,
      positionType,
      socialMediaLink,
      hiringManager,
      phone,
      employees,
    };

    if (profilePicture) {
      try {
        const result = await cloudinary.uploader.upload(profilePicture.path);
        fs.unlinkSync(profilePicture.path);
        updateData.profilePicture = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res
          .status(500)
          .json({ message: "Error uploading image to Cloudinary" });
      }
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedEmployer = await employer.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      employer: updatedEmployer,
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, employer: req.user._id });
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user._id });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.editJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.jobId, employer: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res
        .status(404)
        .json({
          success: false,
          error: "Job not found or you are not authorized to edit this job",
        });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAppliedCandidates = async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("jobseeker", "name email")
      .populate("job", "title");
    res.status(200).json({ success: true, applications });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status },
      { new: true }
    );
    if (!application) {
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    }
    res.status(200).json({ success: true, application });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
