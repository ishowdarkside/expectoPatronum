const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const sharp = require("sharp");

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.file) {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        profilePicture: `/imgs/${req.file?.filename}`,
      },
      { runValidators: true }
    );
  } else {
    await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
      },
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

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../../frontend/public/imgs/${req.file.filename}`);

  next();
});

exports.findUsers = catchAsync(async (req, res, next) => {
  const searchResults = await UserModel.find({ name: req.query.search });
  req.searchResults = searchResults;

  next();
});

exports.getUserData = catchAsync(async (req, res, next) => {
  if (req.params.userId === req.user.id) return res.redirect("/me");
  //populate this
  const user = await UserModel.findById(req.params.userId);
  if (!user) return next("No user found", 404);
  req.searchUserData = user;
  next();
});
