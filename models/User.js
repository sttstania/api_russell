const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email address'
    },
    unique: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [8, 'Password must be at least 8 characters long']
  }
}, { timestamps });

module.exports = mongoose.model("User", userSchema);