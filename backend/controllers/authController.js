const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Email = require("../utils/sendEmail");

const createSendToken = function (id, res) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.set("Authorization", `Bearer ${token}`);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const confrimationToken = crypto.randomBytes(32).toString("hex");
  user.confirmToken = confrimationToken;
  user.confirmTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();
  const url = `${req.protocol}://${req.headers.host}/api/users/confirmAccount/${confrimationToken}`;
  const message = `To confirm your account go to link \n ${url} \nAfter 10 minutes,if you don't confirm your account,your data will be lost and you will have to register again!`;
  await new Email(user, url, message).confirmAccount();

  res.status(200).json({
    status: "success",
    message: `Confrimation email send to ${user.email}`,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    return next(
      new AppError(
        "You don't have a permission to access this route,please log in!",
        401
      )
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await UserModel.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        "User who this token belongs to,doesn't exist anymore! Login Again!"
      )
    );
  if (user.checkPasswordDate())
    return next(
      new AppError(
        "Password has been changed after Token was issued,login again!",
        401
      )
    );

  req.user = user;

  next();
});

exports.confirmAccount = catchAsync(async (req, res, next) => {
  let currentDate = new Date().toISOString();
  const user = await UserModel.findOne({
    confirmToken: req.params.token,
    confirmTokenExpires: { $gte: currentDate },
  });
  if (!user) return res.status(404).send("<h1>Forbidden</h1>");
  user.confirmToken = undefined;
  user.confirmed = true;
  user.confirmTokenExpires = undefined;
  await user.save({ validateBeforeSave: false });

  //Create a token
  const token = await createSendToken(user._id, res);

  res.status(201).json({
    status: "success",
    message: "You have registered successfully!",
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({
    email: req.body.email,
    confirmed: true,
  });
  if (!user) return next(new AppError("Incorrect email/password", 400));
  const test = await bcrypt.compare(req.body.password, user.password);
  if (!test) return next(new AppError("Incorrect email/password", 401));
  const token = await createSendToken(user._id, res);
  res.status(200).json({
    status: "success",
    message: "Successfully Logged in!",
    token,
  });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return next(new AppError("User doesnt exist", 404));
  const passwordResetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = passwordResetToken;
  user.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  const url = `${req.protocol}://${req.headers.host}/api/users/resetPassword/${passwordResetToken}`;
  const message = `To reset password,check link:\n ${url}`;
  await new Email(user, url, message).resetPassword();

  res.status(200).json({
    status: "success",
    message: `Reset password Email sent to ${user.email}`,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = await UserModel.findOne({
    passwordResetToken: req.params.token,
    passwordResetTokenExpires: { $gt: new Date().toISOString() },
  });

  if (!user) return res.status(404).send("<h1>Forbidden</h1>");
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();
  const token = createSendToken(user._id, res);
  res.status(200).json({
    status: "success",
    message: "Password Successfully changed!",
    token,
  });
});

//Interval function that runs every 10 minutes and delete accounts
//that are not confirmed 10 minutes after account watch dispatched
setInterval(async () => {
  let currentDate = new Date().toISOString();
  await UserModel.deleteMany({
    confirmed: false,
    confirmTokenExpires: { $lt: currentDate },
  });
}, 600000);
