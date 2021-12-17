const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("all posts");
});

router.post("/", (req, res, next) => {
  res.json("create new post in db, return new post");
});

router.put("/:id", (req, res, next) => {
  res.json("update and return updated post");
});

router.delete("/:id", (req, res, next) => {
  res.json("delete the post");
});

module.exports = router;
