const { cookieSetter } = require("@/config/features");
const { errorHandler, asyncError } = require("@/middlewares/error");

const handler = asyncError(async (req, res) => {
  if (req.method !== "GET")
    return errorHandler(res, 400, "Only GET request is allowed");

  cookieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
});

export default handler;
