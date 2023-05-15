const { asyncError } = require("@/middlewares/error");
import { connectDB } from "@/config/dbConnection";
import { cookieSetter, generateToken } from "@/config/features";
import { errorHandler } from "@/middlewares/error";
import User from "@/models/user";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST") {
    return errorHandler(res, 400, "Only Post Reaqurest is Allowed");
  }
  const { email, password } = req.body;
  if ((!email, !password))
    return errorHandler(res, 400, "plase fill all field");

  connectDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user) return errorHandler(res, 400, "Inviled Email or password");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return errorHandler(res, 400, "Inviled Email or Password");

  const token = generateToken(user._id);
  cookieSetter(res, token, true);

  res.status(200).json({
    success: true,
    message: `Welcome back ${user.name}`,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

export default handler;
