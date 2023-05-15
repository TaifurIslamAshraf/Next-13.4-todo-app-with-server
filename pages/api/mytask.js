const { asyncError, errorHandler } = require("@/middlewares/error");
import { connectDB } from "@/config/dbConnection";
import { checkAuth } from "@/config/features";
import Task from "../../models/task";

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET request is allowed");

  connectDB();

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const myTasks = await Task.find({ user: user._id });

  res.status(200).json({
    success: true,
    myTasks,
  });
});

export default handler;
