// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", PostSchema);
