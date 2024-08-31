const jobseeker = require("../model/jobseekerModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken")

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
    sendToken(newUser,201,res)
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
