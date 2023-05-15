import { connectDB } from "@/config/dbConnection";
import { checkAuth } from "@/config/features";
import { asyncError, errorHandler } from "@/middlewares/error";
import Task from "@/models/task";

const handler = asyncError(async (req, res) => {
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST request is allowed");
  connectDB();

  const { title, desc } = req.body;
  if (!title || !desc) return errorHandler(res, 400, "plase fill all fields");

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  await Task.create({
    title,
    desc,
    user: user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task is created",
  });
});

export default handler;
