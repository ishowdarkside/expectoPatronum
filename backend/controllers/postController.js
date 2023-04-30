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
  const post = await Post.findById(req.params.postId)
    .populate({
      path: "creator",
      select: "name profilePicture",
    })
    .populate({ path: "comments.creator", select: "name profilePicture" });

  res.status(200).json({
    status: "success",
    data: post,
    currentUser: req.user.id,
  });
});

exports.deleteSinglePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  fs.unlink(`${__dirname}/../../frontend/public${post.postImage}`, (err) => {});
  const user = await UserModel.findById(req.user);
  user.posts.splice(user.posts.indexOf(post.id), 1);
  await user.save({ validateBeforeSave: false });
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

exports.getPostsFollowers = catchAsync(async (req, res, next) => {
  const posts = await Post.find({
    creator: { $in: req.user.following },
  })
    .populate({ path: "creator", select: "name profilePicture" })
    .sort({ createdAt: -1 });
  req.posts = posts;

  next();
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (post.likes.includes(req.user.id)) {
    post.likes.splice(post.likes.indexOf(req.user.id), 1);
    await post.save({ validateBeforeSave: false });
    return res.status(200).json({
      status: "success",
      message: "Unliked",
    });
  } else {
    post.likes.push(req.user.id);
    await post.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Liked",
    });
  }
});

exports.attachPostData = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
    .populate({
      path: "creator",
      select: "name profilePicture followers public",
    })
    .populate({ path: "comments.creator", select: "name profilePicture" });
  if (!post.creator.public && !post.creator.followers.includes(req.user.id))
    return res.send("<h1>Forbidden</h1>");
  req.postData = post;

  next();
});

exports.createComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  const comment = { creator: req.user.id, content: req.body.content };
  post.comments.push(comment);

  await post.save();
  res.status(201).json({
    status: "success",
    message: "Comment created successfully!",
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  post.comments.splice(
    post.comments.findIndex((el) => el.id === req.params.commentId),
    1
  );
  await post.save();
  res.status(200).json({
    status: "success",
    message: "Deleted Successfully!",
  });
});
