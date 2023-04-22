const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./controllers/errorController");
const viewRouter = require("./routers/viewRouter");
const multer = require("multer");
dotenv.config({ path: `${__dirname}/../config.env` });
const app = express();
//const upload = multer({ dest: `${__dirname}/../frontend/public/imgs` });
// Set up the multer middleware with a storage location and file limits
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `${__dirname}/../frontend/public/imgs`); // Set the storage location for the uploaded files
    },
    filename: (req, file, callback) => {
      callback(null, `${req.user.id}-${file.originalname}-${Date.now}`); // Set the file name for the uploaded files
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // Set the maximum file size for uploads (in this case, 5 MB)
  },
});

app.use(express.static("frontend/public"));
app.use(upload.any());
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
