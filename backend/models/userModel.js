const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your Full Name"],
    validate: [
      {
        validator: function (data) {
          return data.split(" ")?.length > 1;
        },
        message: "Please provide full name",
      },
      {
        validator: function (data) {
          return data.match(/^[a-zA-Z ]+$/);
        },
        message: "Make sure you use only letters!",
      },
    ],
  },
  email: {
    type: String,
    required: [true, "Please provide Email adress"],
    unique: [true, "Email already in use!"],
    validate: {
      validator: function (data) {
        return data.match(/^\S+@\S+\.\S+$/);
      },
    },
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 30,
    required: [true, "please provide password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (data) {
        return data === this.password;
      },
      message: "Passwords are not matching",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  confirmed: {
    type: Boolean,
    default: false,
  },

  confirmToken: {
    type: String,
  },
  confirmTokenExpires: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
    default: new Date(Date.now() + 10 * 60 * 1000),
  },

  passwordResetTokenExpires: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
});

UserSchema.methods.checkPasswordDate = function () {
  if (this.passwordChangedAt) {
    const passwordChangedAt = Date.parse(this.passwordChangedAt);
    return passwordChangedAt > Date.now();
  }
  return false;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
