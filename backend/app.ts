import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./routes";
import { CacheMiddleware } from "./middlewares";
import helmet from "helmet";
import {
  CORS_OPTIONS,
  JSON_OPTIONS,
  URL_ENCODE_OPTIONS,
} from "./utils/constant";

const app = express();

// Middlewares
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(compression());
app.use(express.urlencoded(URL_ENCODE_OPTIONS));
app.use(cookieParser());
app.use(helmet());

app.use(express.json(JSON_OPTIONS));
app.use(cors(CORS_OPTIONS));
app.use(CacheMiddleware);

// Routes
app.use("/api/v1", router);

export { app };
