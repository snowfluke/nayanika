import { ForbiddenError, UnauthorizedError } from "../utils/errorHandler";
import {
  Request,
  Response,
  NextFunction,
  CustomRequest,
  accessTokenDecoded,
} from "../utils/types";
import { verifyToken } from "../utils";

const AdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  const adminHeader = req.headers.authorization;

  if (!adminHeader?.startsWith("Bearer "))
    return next(new UnauthorizedError("Unauthorized access"));

  const accessToken = adminHeader.split(" ")[1];

  try {
    const accessData = verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as accessTokenDecoded;

    const customReq = req as CustomRequest;
    customReq.data = accessData;

    next();
  } catch (error) {
    return next(new ForbiddenError("Forbidden"));
  }
};

export default AdminAuth;
