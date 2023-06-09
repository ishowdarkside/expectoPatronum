const app = require(`${__dirname}/app.js`);
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const DB = process.env.MONGODB_LINK.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((err) => {
    if (process.env.NODE_ENV === "development") {
      console.log(err);
    }
    console.log("something went wrong connecting to database");
  });

app.listen(port, () => {
  console.log("listening on port 3000");
});
