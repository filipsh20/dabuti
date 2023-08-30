import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  token: { type: String },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
