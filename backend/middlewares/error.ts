import { Response, Request, NextFunction } from "express";
import { ResponseError } from "../utils/types";
import { STATUS } from "../utils/constant";

const ErrorMiddleware = async (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || STATUS.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || "Internal Server Error";

  res
    .status(statusCode)
    .json({ status: "error", code: statusCode, message: errorMessage });
};

export default ErrorMiddleware;
