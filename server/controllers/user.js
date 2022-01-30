import userMessage from "../modules/userMessage.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userController = {
  signin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await userMessage.findOne({username});
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
      res
        .status(500)
        .json({
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

      const token = jwt.sign({ username: result.username, id: result._id }, "test", {
        expiresIn: "1h",
      });

      res.status(201).json({ result , token });
    } catch (error) {
      res
        .status(500)
        .json({
          message: { error: "Something went wrong! Try again later. " },
        });
    }
  },
};

export default userController;
