import bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import kebabCase from "lodash.kebabcase";
import jwt from "jsonwebtoken";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export const generatePassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateSlug = (title: string) => {
  const slugSalt = title.substring(0, 360) + " " + nanoid(10);
  let slug = encodeURI(kebabCase(slugSalt));
  return slug;
};

export const generateNormalSlug = (text: string) => {
  let slug = encodeURI(kebabCase(text));
  return slug;
};

export const createToken = (
  payload: Object,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export { default as logger } from "./logHandler";
