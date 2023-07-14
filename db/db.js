const mongoose = require("mongoose");
const connectDb = () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017")
    .connect("mongodb+srv://BMSAdmin:BMSAdmin@cluster0.0pelmsq.mongodb.net/")
    .then(() => {
      console.log(
        `Data Base Connected Sucessfully ${mongoose.connection.host}`
      );
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
module.exports = connectDb;
