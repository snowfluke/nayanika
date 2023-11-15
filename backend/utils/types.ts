import { NextFunction, Request, Response } from "express";

export interface ResponseError extends Error {
  status?: number;
}

export interface CustomRequest extends Request {
  data: accessTokenDecoded;
}

export type adminRoles = "superadmin" | "uploader" | "updater" | "curator";

export type adminRolesObject = { [key in adminRoles]: adminRoles };

export type refreshTokenDecoded = {
  email: string;
};

export type accessTokenDecoded = {
  email: string;
  role: string;
};

export { NextFunction, Response, Request };
