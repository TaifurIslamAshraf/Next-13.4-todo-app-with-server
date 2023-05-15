import { checkAuth } from "@/config/features";

const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET request is allowed");

  const user = await checkAuth(req);
  if (!user) return errorHandler(res, 401, "Login First");
  res.status(200).json({
    success: true,
    user,
  });
});

export default handler;
