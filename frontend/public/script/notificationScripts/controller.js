import Notification from "./view.js";
import { acceptRequest, declineRequest, followUser } from "./model.js";
Notification.handleRedirection(acceptRequest, declineRequest);
Notification.handleFollowingPanel(followUser);
