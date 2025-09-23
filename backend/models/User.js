const mongoose = require("mongoose");
const { Schema } = mongoose;

// here is where i have the methods, like receive, delete or read for example

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema)

// i will use this guy, "User" on my controller for to do the actions 

module.exports = User;

// i can interpret that like the models by laravel, i am saying basicly here what kind of datas i will save on the bank