import { getCurrUserPosts, getSinglePost, deleteSinglePost } from "./model.js";
import PostView from "./view.js";
import meDataView from "./meDataView.js";

PostView.populatePosts(getCurrUserPosts);
PostView.handleEachPost(getSinglePost, deleteSinglePost);
meDataView.updatePostCount(getCurrUserPosts);
