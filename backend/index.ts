import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import { logger } from "./utils";

dotenv.config();
const PORT = process.env.PORT || 4000;

// DB Connection
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(async () => {
    // Start server
    app.listen(PORT, async () =>
      logger.info("server and database running on port " + PORT)
    );
  })
  .catch(async (err) => logger.error(err));

// Global error catch
process.once("unhandledRejection", async function (reason) {
  logger.error(reason);
});

process.once("uncaughtException", async function (err) {
  logger.error(err.message);
});
