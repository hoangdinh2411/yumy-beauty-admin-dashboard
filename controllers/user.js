import userMessage from "../modules/userMessage.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userController = {
 
  signin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await userMessage.findOne({ username });
      if (!existingUser)
        return res
          .status(404)
          .json({ message: { error: "The username was incorrect." } });

      const isPasswordCorrect = await bcryptjs.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ message: { error: "The password was incorrect." } });

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "sign in",
        { expiresIn: "1h" }
      );

      res.status(201).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({
        message: { error: "Something went wrong! Try again later. " },
      });
    }
  },

  // Sign up by username
  signup: async (req, res) => {
    const { fullName, email, username, password, confirmPassword } = req.body;

    try {
      const existingUser = await userMessage.findOne({ username });
      if (existingUser)
        return res
          .status(400)
          .json({ message: { error: "User already exists" } });

      if (password !== confirmPassword)
        return res
          .status(400)
          .json({ message: { error: "Password don't much" } });

      const hashedPassword = await bcryptjs.hash(password, 12);

      const result = await userMessage.create({
        username,
        email,
        password: hashedPassword,
        fullName,
      });

      const token = jwt.sign(
        { username: result.username, id: result._id },
        "test",
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({
        message: { error: "Something went wrong! Try again later. " },
      });
    }
  },

  updateProfile: async (req, res) => {
    const { id: _id } = req.params;
    const newData = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(_id))
        return res
          .status(404)
          .json({ message: { error: "Cannot edit profile" } });

      const updateProfile = await userMessage.findByIdAndUpdate(
        _id,
        { ...newData, _id },
        { new: true }
      );
      res.json(updateProfile);
    } catch (error) {
      res.status(500).json({
        message: { error: "Something went wrong! Try again later. " },
      });
    }
  },
 
  resetPassword: async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
      // find existed user
      const existingUser = await userMessage.findOne({ email });
      if (!existingUser)
        return res.status(404).json({
          message: { error: "User with given email doesn't exist" },
        });
      // compare old password that user entered with the  saved password on data
      const isOldPasswordCorrect = await bcryptjs.compare(
        oldPassword,
        existingUser.password
      );

      if (!isOldPasswordCorrect)
        return res
          .status(400)
          .json({ message: { error: "Old password was incorrect" } });

      //hash new password
      const hashedNewPassword = await bcryptjs.hash(newPassword, 12);

      //save new password
      existingUser.password = hashedNewPassword;
      await existingUser.save();
      res.status(201).json({
        username: existingUser.username,
        password: newPassword,
      });
    } catch (error) {
      res.status(500).json({
        message: { error: "Something went wrong! Try again later. " },
      });
    }
  },


};

export default userController;
