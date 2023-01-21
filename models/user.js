// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);
