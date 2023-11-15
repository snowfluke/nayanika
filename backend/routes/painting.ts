import Router from "express-promise-router";
const router = Router();

router.get("/", async (req, res) => {
  res.json({ message: "Get all the painting (maybe limit to 50)" });
});

router.get("/search", async (req, res) => {
  res.json({ message: "Search a painting" });
});

router.post("/", async (req, res) => {
  res.json({ message: "Post a new painting" });
});

router.get("/:id", async (req, res) => {
  res.json({ message: "Get a single painting by id" });
});

router.put("/:id", async (req, res) => {
  res.json({ message: "Edit a single painting by id" });
});

router.delete("/:id", async (req, res) => {
  res.json({ message: "Delete a single painting by id" });
});

export default router;
