
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const jobseeker = require("../model/jobseekerModel");

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
    sendToken(newUser, 201, res);
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

    // Find user by email
    const user = await jobseeker.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      email,
      address,
      jobtitlename,
      city,
      state,
      country,
      pincode,
      positionType,
      socialMediaLink,
    } = req.body;

    const profilePicture = req.file;

    let updateData = {
      email,
      address,
      jobtitlename,
      city,
      state,
      country,
      pincode,
      positionType,
      socialMediaLink,
    };

    if (profilePicture) {
      try {
        const result = await cloudinary.uploader.upload(profilePicture.path);
        fs.unlinkSync(profilePicture.path);

        updateData.profilePicture = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedJobseeker = await jobseeker.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedJobseeker) {
      return res.status(404).json({ message: "Jobseeker not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", jobseeker: updatedJobseeker });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
