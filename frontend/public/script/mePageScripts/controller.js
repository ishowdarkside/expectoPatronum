import {
  getCurrUserPosts,
  getSinglePost,
  deleteSinglePost,
  postComment,
  deleteComment,
  followUser,
} from "./model.js";
import PostView from "./view.js";

PostView.populatePosts(getCurrUserPosts);
PostView.handleEachPost(
  getSinglePost,
  deleteSinglePost,
  postComment,
  deleteComment
);

PostView.handleFollowingPanel(followUser);
