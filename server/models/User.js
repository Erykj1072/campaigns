const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema describes what a user will look like
const userSchema = new Schema({
  googleID: String,
});

// Create a new collection/ Schema called users
mongoose.model("users", userSchema);
