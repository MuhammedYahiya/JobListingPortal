const employer = require("../model/employerModel");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");



exports.registerEmployer = async (req, res) => {
  try {
    const existingUser = await employer.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email id is already existing" });
    }

    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password should be at least 8 characters" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

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
    });

    await newUser.save();
    res.status(200).json({ message: "User registration successful" });
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

    // Find user by email
    const user = await employer.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

exports.updateEmployerProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using some authentication middleware to attach the user's ID to the request

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
        return res.status(500).json({ message: "Error uploading image to Cloudinary" });
      }
    }

    // Remove undefined fields from the updateData object
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    // Find the employer by ID and update their profile
    const updatedEmployer = await employer.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true, // Ensures the updated data is validated
    });

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
