import Router from "express-promise-router";
import path from "path";
const router = Router();

router.get("/image/:name", async (req, res) => {
  const { name } = req.params;
  res.status(200).sendFile(path.join(__dirname, "../public/art/" + name));
});

router.get("/home", async (req, res) => {
  res.json({ message: "Get the homepage" });
});

router.put("/home", async (req, res) => {
  res.json({ message: "Edit the homepage" });
});

export default router;
