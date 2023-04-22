const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./controllers/errorController");
const viewRouter = require("./routers/viewRouter");
dotenv.config({ path: `${__dirname}/../config.env` });
const app = express();
app.use(express.static("frontend/public"));

//Setting up view engine
app.set("view engine", "pug");
//morgan Listening to incoming requests
app.use(morgan("dev"));
//parsing the cookie
app.use(cookieParser());
//Parsing json
app.use(express.json());
//Routing
app.use("/api/users", userRouter);

//view rendering
app.use("/", viewRouter);

//global error middleware function
app.use(errorMiddleware);
module.exports = app;
