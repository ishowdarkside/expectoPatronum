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
