import { CookieOptions } from "express";
import { adminRoles, adminRolesObject } from "./types";

export const ADMIN_ROLE: adminRoles[] = [
  "superadmin",
  "uploader",
  "updater",
  "curator",
];
export const ADMIN_ROLE_OBJECT: adminRolesObject = ADMIN_ROLE.reduce(
  (acc, role) => {
    acc[role] = role;
    return acc;
  },
  {} as adminRolesObject
);

export const STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIME_OUT: 408,
  TOO_MANY_REQUEST: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const JSON_OPTIONS = {
  limit: "11mb",
};

export const URL_ENCODE_OPTIONS = { extended: true };

export const COOKIES_OPTIONS = {
  secure: process.env.NODE_ENV === "production" ? true : false,
  httpOnly: true,
  maxAge: 1 * 60 * 60 * 1000, // 1d
  sameSite: "strict",
} as CookieOptions;

export const CORS_OPTIONS = {
  origin:
    process.env.NODE_ENV === "production" ? process.env.FRONTEND_DOMAIN : "*",
  methods: "GET, POST, PATCH, DELETE",
  allowedHeaders: "Content-Type, Accept, Authorization",
};
