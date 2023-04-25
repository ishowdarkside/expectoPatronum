const { formToJSON } = require("axios");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postImage: {
      type: String,
    },
    postDescription: {
      type: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

//postSchema.pre(/^find/, function (next) {});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
