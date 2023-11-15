import Router from "express-promise-router";
const router = Router();

import generalRoute from "./general";
import paintingRoute from "./painting";
import artistRoute from "./artist";
import tagRoute from "./tag";
import adminRoute from "./admin";
import authRoute from "./auth";

import { ErrorMiddleware } from "../middlewares";

// All routes
router.use("/", generalRoute);
router.use("/painting", paintingRoute);
router.use("/artist", artistRoute);
router.use("/tag", tagRoute);
router.use("/admin", adminRoute);
router.use("/auth", authRoute);

// Error middleware
router.use(ErrorMiddleware);

export default router;
