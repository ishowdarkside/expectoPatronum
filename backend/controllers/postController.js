const Post = require("../models/postModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sharp = require("sharp");
const fs = require("fs");
const UserModel = require("../models/userModel");

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await new Post({
    postImage: `/imgs/${req.file.filename}`,
    postDescription: req.body.postDescription,
    creator: req.user._id,
  });
  //const currentUser = await User.findById(req.user.id, { posts: post._id });
  const currentUser = await User.findById(req.user.id);
  currentUser.posts.push(post._id);
  await currentUser.save({ validateBeforeSave: false });
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Post created successfully!",
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

exports.getPostCurrUser = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ creator: req.user.id });
  if (!posts)
    return res
      .status(200)
      .json({ status: "success", message: "Nothing to show here" });

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

exports.getSinglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId).populate({
    path: "creator",
    select: "name profilePicture",
  });

  res.status(200).json({
    status: "success",
    data: post,
  });
});

exports.deleteSinglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  fs.unlink(`${__dirname}/../../frontend/public${post.postImage}`, (err) => {});
  await post.deleteOne();

  res.status(204).json({ status: "success" });
});

exports.getPostsParamUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.userId);
  if (!user.public && !user.followers.includes(req.user.id)) {
    return res.status(200).json({
      status: "success",
      data: "Private Account",
    });
  }
  const posts = await Post.find({ creator: req.params.userId });
  return res.status(200).json({
    status: "success",
    data: posts,
  });
});
