const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      trim: true,
      minlength: [6, "Your password must be at least 6 characters long"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
//DB middleware
userSchema.pre(/^find/, function (next) {
  // exclude password and __v fields from all find queries
  this.select("-password -__v -createdAt -updatedAt -_id");
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
