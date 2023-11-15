import Router from "express-promise-router";
const router = Router();

router.post("/", async (req, res) => {
  res.json({ message: "Post a new artist" });
});

router.get("/:id", async (req, res) => {
  res.json({ message: "Get a single artist by id" });
});

router.put("/:id", async (req, res) => {
  res.json({ message: "Edit a single artist by id" });
});

router.delete("/:id", async (req, res) => {
  res.json({ message: "Delete a single artist by id" });
});

export default router;
