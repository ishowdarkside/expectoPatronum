import { postComment, deleteComment, likePost, followUser } from "./model.js";
import SpecificPost from "./view.js";

SpecificPost.handleComment(postComment);
SpecificPost.handleDeleteComment(deleteComment);
SpecificPost.handleLikePost(likePost);
SpecificPost.handleFollowingPanel(followUser);
