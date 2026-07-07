import ApiResponse from "../utils/Apiresponse.js";
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, err.message, null, false));
};

export default errorMiddleware;
