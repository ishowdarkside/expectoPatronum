import { uploadPost, followUser } from "./model.js";
import viewInstance from "./view.js";

viewInstance.handlePosting(uploadPost);
viewInstance.handleFollowingPanel(followUser);
