const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobseeker: {
    type: Schema.Types.ObjectId,
    ref: 'jobseeker',
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'selected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;