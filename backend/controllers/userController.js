const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.updateMe = catchAsync(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { runValidators: true }
  );
  console.log(req.file);
  res.status(200).json({
    status: "success",
    message: "Personal Informations changed successfully!",
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "succes",
    message: "password changed successfully!",
  });
});
