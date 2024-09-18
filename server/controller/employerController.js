const employer = require("../model/employerModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

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
      image : req.body.image,
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

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error logging in" });
  }
};
