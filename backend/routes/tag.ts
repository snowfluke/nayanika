import Router from "express-promise-router";
const router = Router();

router.post("/", async (req, res) => {
  res.json({ message: "Post a new tag" });
});

router.get("/:id", async (req, res) => {
  res.json({ message: "Get a single tag by id" });
});

router.put("/:id", async (req, res) => {
  res.json({ message: "Edit a single tag by id" });
});

router.delete("/:id", async (req, res) => {
  res.json({ message: "Delete a single tag by id" });
});

export default router;
