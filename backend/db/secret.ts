import crypto from "crypto";

const SECRET = [
  "APP_SECRET=",
  "ACCESS_TOKEN_SECRET=",
  "REFRESH_TOKEN_SECRET=",
  "FORGOT_PASSWORD_SECRET=",
];

const ENV = SECRET.map((secret) => {
  return secret + crypto.randomBytes(64).toString("hex");
}).join("\n");

console.log(ENV);
