import { loginUser } from "./model.js";
import LoginView from "./view.js";

LoginView.attachListener(loginUser);
