import { getCurrUserPosts, getSinglePost, deleteSinglePost } from "./model.js";
import PostView from "./view.js";

PostView.populatePosts(getCurrUserPosts);
PostView.handleEachPost(getSinglePost, deleteSinglePost);
