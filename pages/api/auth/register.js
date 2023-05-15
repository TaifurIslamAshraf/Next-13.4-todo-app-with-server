import { connectDB } from "@/config/dbConnection";
import { cookieSetter, generateToken } from "@/config/features";
import { asyncError, errorHandler } from "@/middlewares/error";
import User from "@/models/user";
import bcrypt from "bcrypt";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST request is allowed");

  const { name, email, password } = req.body;

  if ((!name, !email, !password))
    return errorHandler(res, 400, "please enter all fields");

  connectDB();

  let user = await User.findOne({ email });
  if (user) return errorHandler(res, 400, "User alredy exists");

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = generateToken(user._id);
  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: "Registerd successfully",
    user,
  });
});

export default handler;
