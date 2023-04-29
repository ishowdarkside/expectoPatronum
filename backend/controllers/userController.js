const catchAsync = require("../utils/catchAsync");
const UserModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const sharp = require("sharp");
const { ObjectId } = require("mongodb");

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (req.file) {
    user.name = req.body.name;
    user.email = req.body.email;
    user.description = req.body.description;
    user.profilePicture = `/imgs/${req.file?.filename}`;
    user.public = JSON.parse(req.body.privatePublic);
  } else {
    user.name = req.body.name;
    user.email = req.body.email;
    user.description = req.body.description;
    user.public = JSON.parse(req.body.privatePublic);
  }

  await user.save({ validateBeforeSave: true });
  next();
});

exports.transportRequests = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  if (user.public) {
    user.requests.forEach((el) => {
      user.followers.push(el);
      user.requests.splice(user.requests.indexOf(el), 1);
    });

    await user.save({ validateBeforeSave: false });
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
  const regex = new RegExp(req.query.search, "i");
  const searchResults = await UserModel.find({ name: { $regex: regex } });
  req.searchResults = searchResults;

  next();
});

exports.getUserData = catchAsync(async (req, res, next) => {
  if (req.params.userId === req.user.id) return res.redirect("/me");
  //populate this
  const user = await UserModel.findById(req.params.userId);
  if (!user) return next("No user found", 404);
  if (!user.public && !user.followers.includes(req.user.id)) {
    req.isPrivate = true;
  }
  req.searchUserData = user;
  next();
});

exports.followRequest = catchAsync(async (req, res, next) => {
  //find user by url

  const targetUser = await UserModel.findById(req.params.userId);
  const currentUser = await UserModel.findById(req.user.id);
  //if user public, push currentUser to follower array
  if (targetUser.public) {
    if (targetUser.followers.includes(req.user.id)) {
      targetUser.followers.splice(targetUser.followers.indexOf(req.user.id), 1);
      //remove target user from current users data
      currentUser.following.splice(
        currentUser.following.indexOf(targetUser.id),
        1
      );
      await currentUser.save({ validateBeforeSave: false });
      await targetUser.save({ validateBeforeSave: false });
      return res.status(200).json({
        status: "success",
        message: "Unfollowed successfully!",
      });
    } else {
      targetUser.followers.push(req.user.id);
      currentUser.following.push(targetUser.id);
      await currentUser.save({ validateBeforeSave: false });
      await targetUser.save({ validateBeforeSave: false });
      return res.status(200).json({
        status: "success",
        message: "Started following successfully!",
      });
    }
  }
  //if user private and currentUser already in requested list - remove user from list,once api called
  if (!targetUser.public && targetUser.requests.includes(req.user.id)) {
    targetUser.requests.splice(targetUser.requests.indexOf(req.user.id), 1);
    await targetUser.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "unrequested follow successfully",
    });
  }
  if (!targetUser.public && targetUser.followers.includes(req.user.id)) {
    targetUser.followers.splice(targetUser.followers.indexOf(req.user.id), 1);
    currentUser.following.splice(
      currentUser.following.indexOf(targetUser.id),
      1
    );
    await currentUser.save({ validateBeforeSave: false });
    await targetUser.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Unfollowed private successfully!",
      private: true,
    });
  }
  //if user private and doesnt exist in requests list, put him in there
  else if (
    !targetUser.public &&
    !targetUser.requests.includes(req.user.id) &&
    !targetUser.followers.includes(req.user.id)
  ) {
    targetUser.requests.push(req.user.id);
    await targetUser.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Requested successfully",
    });
  }
});

exports.logoutUser = (req, res, next) => {
  res.cookie("jwt", "", { expires: new Date(Date.now() - 2000) });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};

exports.populateRequests = catchAsync(async (req, res, next) => {
  const currentUser = await UserModel.findById(req.user.id)
    .select("requests")
    .populate({ path: "requests", select: "name description profilePicture" });

  req.followRequests = currentUser.requests;

  next();
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const me = await UserModel.findById(req.user.id).populate({
    path: "requests",
    select: "name email",
  });
  //put requester inside followers array
  const requester = me.requests.find((el) => el.id === req.params.identifier);
  if (!requester)
    return res.status(400, { status: "fail", message: "Bad request!" });
  me.followers.push(requester._id);
  //remove requester from requests
  me.requests.splice(
    me.requests.findIndex((el) => el.id === req.params.id),
    1
  );
  const requesterData = await UserModel.findById(req.params.identifier);
  if (!requesterData)
    return res.status(400, { status: "fail", message: "Bad request!" });
  requesterData.following.push(me._id);
  await requesterData.save({ validateBeforeSave: false });
  await me.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "accepted successfully!",
  });
});

exports.declineRequest = catchAsync(async (req, res, next) => {
  const me = await UserModel.findById(req.user.id);
  me.requests.splice(me.requests.indexOf(req.params.identifier), 1);
  await me.save();
  res.status(200).json({
    status: "success",
    message: "declined successfully",
  });
});
