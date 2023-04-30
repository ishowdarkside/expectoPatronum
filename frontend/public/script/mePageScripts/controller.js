import {
  getCurrUserPosts,
  getSinglePost,
  deleteSinglePost,
  postComment,
  deleteComment,
} from "./model.js";
import PostView from "./view.js";

PostView.populatePosts(getCurrUserPosts);
PostView.handleEachPost(
  getSinglePost,
  deleteSinglePost,
  postComment,
  deleteComment
);
