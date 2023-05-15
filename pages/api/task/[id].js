import Task from "@/models/task";

const { connectDB } = require("@/config/dbConnection");
const { checkAuth } = require("@/config/features");
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
  connectDB();
  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");

  const task = await Task.findById(req.query.id);

  if (!task) return errorHandler(res, 404, "Task Not Found");

  if (req.method === "PUT") {
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(201).json({
      success: true,
      message: "Task is updated successfully",
    });

    console.log(req.query.id);
  } else if (req.method === "DELETE") {
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } else {
    errorHandler(res, 400, "This method is not available");
  }
});

export default handler;
