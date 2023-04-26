import { getPosts, getSinglePost } from "./model.js";
import SpecUserPosts from "./view.js";

SpecUserPosts.populatePosts(getPosts);
SpecUserPosts.handleEachPost(getSinglePost);
