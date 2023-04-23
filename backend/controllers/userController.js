const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.file) {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        profilePicture: `/imgs/${req.file?.filename}`,
      },
      { runValidators: true }
    );
  } else {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      { name: req.body.name, email: req.body.email },
      { runValidators: true }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Data successfully updated!",
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);
  const compared = await bcrypt.compare(
    req.body.currentPassword,
    req.user.password
  );
  if (!compared) return next(new AppError("Wrong password!", 401));
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save({ validateBeforeSave: true });

  res.status(200).json({
    status: "success",
    message:
      "password changed successfully! You will be redirected to login page shortly",
  });
});
