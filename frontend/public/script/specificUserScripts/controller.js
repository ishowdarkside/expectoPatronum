import { getPosts, getSinglePost, followUser, likePost } from "./model.js";
import SpecUserPosts from "./view.js";

SpecUserPosts.populatePosts(getPosts);
SpecUserPosts.handleEachPost(getSinglePost, likePost);
SpecUserPosts.handleRequestingFollow(followUser);
