import bcrypt from "bcrypt";
import { Admin } from "../models/Admin";
import { createToken, verifyToken } from "../utils";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/errorHandler";
import { SuccessResponse } from "../utils/successHandler";
import { COOKIES_OPTIONS, STATUS } from "../utils/constant";
import {
  NextFunction,
  Request,
  Response,
  refreshTokenDecoded,
} from "../utils/types";

export const adminSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const cookies = req.cookies;

  if (!email || !password)
    throw new BadRequestError("All fields cannot be empty");

  const admin = await Admin.findOne({ email });
  if (!admin) throw new NotFoundError("User not found");

  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new UnauthorizedError("Email or password does not matched");

  const accessToken = createToken(
    {
      email: admin.email,
      role: admin.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    "15m"
  );

  const newRefreshToken = createToken(
    { email: admin.email },
    process.env.REFRESH_TOKEN_SECRET!,
    "1d"
  );

  let newRefreshTokenArray = admin.refreshToken;

  if (cookies?.refresh) {
    const refreshToken = cookies.refresh;
    const foundToken = await Admin.findOne({ refreshToken });

    // REUSED REFRESH TOKEN
    newRefreshTokenArray = foundToken
      ? admin.refreshToken?.filter((rt) => rt !== cookies.refresh)
      : [];

    res.clearCookie("refresh");
  }

  await Admin.findOneAndUpdate(
    { email },
    {
      refreshToken: [...newRefreshTokenArray!, newRefreshToken],
    }
  );

  res.cookie("refresh", newRefreshToken, COOKIES_OPTIONS);

  const adminData = admin.toJSON();
  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully logged in",
    { ...adminData, token: accessToken }
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};

export const adminRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.refresh)
    return next(new UnauthorizedError("Unauthorized access"));

  const refreshToken = cookies.refresh;
  res.clearCookie("refresh");

  const admin = await Admin.findOne({ refreshToken });

  // REUSE DETECTED
  if (!admin) {
    try {
      const refreshData = verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as refreshTokenDecoded;

      await Admin.findOneAndUpdate(
        { email: refreshData.email },
        {
          $set: {
            refreshToken: [],
            lastlogin: Date.now(),
          },
        }
      );

      throw new Error();
    } catch (error) {
      return next(new ForbiddenError("Forbidden"));
    }
  }

  try {
    const refreshData = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as refreshTokenDecoded;

    if (admin.email !== refreshData.email)
      return next(new ForbiddenError("Forbidden"));
    const accessToken = createToken(
      {
        email: admin.email,
        role: admin.role,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      "15m"
    );

    const newRefreshToken = createToken(
      { email: admin.email },
      process.env.REFRESH_TOKEN_SECRET!,
      "1d"
    );
    await Admin.findOneAndUpdate(
      { email: refreshData.email },
      {
        $push: {
          refreshToken: newRefreshToken,
        },
      }
    );

    const ApiResponse = new SuccessResponse(
      STATUS.SUCCESS,
      "Refreshed the token",
      {
        token: accessToken,
      }
    );

    res.cookie("refresh", newRefreshToken, COOKIES_OPTIONS);
    res.status(STATUS.SUCCESS).json(ApiResponse);
  } catch (error) {
    // VALID BUT EXPIRED
    await Admin.findOneAndUpdate(
      { refreshToken },
      {
        $set: {
          refreshToken: { $pull: { refreshToken } },
          lastlogin: Date.now(),
        },
      }
    );

    return next(new ForbiddenError("Forbidden"));
  }
};

export const adminSignout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.refresh) {
    const ApiResponse = new SuccessResponse(
      STATUS.NO_CONTENT,
      "No Cookies",
      {}
    );
    res.status(STATUS.NO_CONTENT).json(ApiResponse);
    return;
  }
  const refreshToken = cookies.refresh;

  await Admin.findOneAndUpdate(
    { refreshToken },
    {
      $pull: { refreshToken: refreshToken },
      $set: {
        lastlogin: Date.now(),
      },
    }
  );

  res.clearCookie("refresh");

  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully signout",
    {}
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};

export const adminCreate = async (req: Request, res: Response) => {
  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully create the admin",
    {}
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};

export const adminRead = async (req: Request, res: Response) => {
  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully read the admin",
    {}
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};

export const adminUpdate = async (req: Request, res: Response) => {
  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully update the admin",
    {}
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};

export const adminDelete = async (req: Request, res: Response) => {
  const ApiResponse = new SuccessResponse(
    STATUS.SUCCESS,
    "Successfully delete the admin",
    {}
  );
  res.status(STATUS.SUCCESS).json(ApiResponse);
};
