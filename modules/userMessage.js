import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  phone : Number
});

const userMessage = mongoose.model("UserMessage", userSchema);
export default userMessage;
