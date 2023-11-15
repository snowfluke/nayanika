import Router from "express-promise-router";
import { AdminAuthMiddleware, AdminRoleMiddleware } from "../middlewares";
import {
  adminSignin,
  adminRefresh,
  adminSignout,
  adminCreate,
  adminRead,
  adminUpdate,
  adminDelete,
} from "../controllers/admin";
import { ADMIN_ROLE_OBJECT } from "../utils/constant";
const router = Router();

router.post("/signin", adminSignin);

router.use(AdminAuthMiddleware);

router.get("/refresh", adminRefresh);

router.post("/signout", adminSignout);

router.use(AdminRoleMiddleware([ADMIN_ROLE_OBJECT.superadmin]));

router.get("/", adminRead);

router.put("/", adminUpdate);

router.post("/", adminCreate);

router.delete("/", adminDelete);

export default router;
