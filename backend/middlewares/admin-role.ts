import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errorHandler";
import { ADMIN_ROLE } from "../utils/constant";
import { CustomRequest, adminRoles } from "../utils/types";

const AdminRole = (roles: adminRoles[] = ADMIN_ROLE) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    const customReq = req as CustomRequest;
    const { role } = customReq.data;

    if (!roles.includes(role as adminRoles))
      return next(new UnauthorizedError("Unauthorized roles"));
    next();
  };
};

export default AdminRole;
