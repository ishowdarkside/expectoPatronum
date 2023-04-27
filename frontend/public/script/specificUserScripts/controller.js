import { getPosts, getSinglePost, followUser } from "./model.js";
import SpecUserPosts from "./view.js";

SpecUserPosts.populatePosts(getPosts);
SpecUserPosts.handleEachPost(getSinglePost);
SpecUserPosts.handleRequestingFollow(followUser);
