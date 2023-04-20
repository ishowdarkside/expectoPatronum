import { registerData } from "./model.js";
import registerView from "./view.js";

registerView.attachListener(registerData);
console.log("i am working");
