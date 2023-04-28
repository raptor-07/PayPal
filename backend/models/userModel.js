const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      maxlength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
      unique: true,
      select: false
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
      minlength: [6, "Your password must be at least 6 characters long"],
      select: false,
    },
    passwordIsChanged: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    timestamps: true,
  }
);
//DB middleware
userSchema.pre(/^find/, function (next) {
  // exclude password and __v fields from all find queries
  this.select("-__v -createdAt -updatedAt -_id");
  next();
});
userSchema.pre('save', async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre('updateOne', async function (next) {
  // only run this function if password was actually modified
  if (!this._update.password) return next();
  // hash the password with cost of 12
  this._update.password = await bcrypt.hash(this._update.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
