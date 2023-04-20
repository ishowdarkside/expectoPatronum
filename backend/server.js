const app = require(`${__dirname}/app.js`);
const mongoose = require("mongoose");

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
    console.log("something went wrong connecting to database");
  });

app.listen(3000, () => {
  console.log("listening on port 3000");
});
