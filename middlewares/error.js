export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal server error"
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export const asyncError = (passFunc) => (req, res) => {
  return Promise.resolve(passFunc(req, res)).catch((err) => {
    return errorHandler(res, 500, err.message);
  });
};
