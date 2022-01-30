import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  //File khong can required
  // selectedFile: String,
  email: { type: String, required: true },
});

const userMessage = mongoose.model("UserMessage", userSchema);
export default userMessage;
