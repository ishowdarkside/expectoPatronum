const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postImage: {
    type: String,
  },
  postDescription: {
    type: String,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
