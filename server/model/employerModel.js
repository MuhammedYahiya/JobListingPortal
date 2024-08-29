const mongoose = require("mongoose");
const validator = require("validator")
const { Schema } = mongoose;
                                    
const employerSchema = new Schema({
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
  phone: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, 'Phone number must me 10 digit'],
  },
  address: {
    type: String,
    trim: true,
  },
  companyName: {
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
  hiringManager: {
    type: String,
    trim: true,
  },
  employees: {
    type: String,
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

employerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const employer = mongoose.model('employer',employerSchema)


module.exports = employer