import Router from "express-promise-router";
const router = Router();

// For future
router.post("/signin", async (req, res) => {
  res.json({ message: "Signin" });
});

router.post("/signup", async (req, res) => {
  res.json({ message: "Signup" });
});

router.post("/forget", async (req, res) => {
  res.json({ message: "Forget" });
});

export default router;
