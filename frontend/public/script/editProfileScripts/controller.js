import { updateInfo, updatePassword, logout, followUser } from "./model.js";
import updateClass from "./view.js";

updateClass.handleGeneralForm(updateInfo);
updateClass.handlePasswordForm(updatePassword);
updateClass.handleLogout(logout);
updateClass.handleFollowingPanel(followUser);
