const mongoose = "mongoose";
const app = require("./app");

mongoose.set("strictQwery", true);

const DB_HOST =
  "mongodb+srv://Minaht:gideon1983@cluster0.ccmrmnr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQwery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("connect base");
  })
  .cath((error) => {
    console.log(error.message);
    process.exit(1);
  });
