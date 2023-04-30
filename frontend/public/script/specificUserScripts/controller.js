import {
  getPosts,
  getSinglePost,
  followUser,
  likePost,
  postComment,
  deleteComment,
} from "./model.js";
import SpecUserPosts from "./view.js";

SpecUserPosts.populatePosts(getPosts);
SpecUserPosts.handleEachPost(
  getSinglePost,
  likePost,
  postComment,
  deleteComment
);
SpecUserPosts.handleRequestingFollow(followUser);
