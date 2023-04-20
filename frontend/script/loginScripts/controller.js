import { loginUser } from "./model.js";
import LoginView from "./view.js";
console.log("i am working");
LoginView.attachListener(loginUser);
