const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const sharp = require("sharp");

exports.createPost = catchAsync(async (req, res, next) => {
  const post = await new Post({
    postImage: `/imgs/${req.file.filename}`,
    postDescription: req.body.postDescription,
    creator: req.user._id,
  });
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Post created successfully!",
  });
});

exports.resizePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  console.log(req.file);

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
  await Post.findByIdAndDelete(req.params.postId);
  res.status(204).json({ status: "success" });
});
