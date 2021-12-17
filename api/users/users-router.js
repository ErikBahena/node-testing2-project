const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("return all users");
});

router.post("/", (req, res, next) => {
  res.json("create a new user in db and return new user");
});

router.put("/:id", (req, res, next) => {
  res.json("update and return updated user");
});

router.delete("/:id", (req, res, next) => {
  res.json("delte a user and all posts related to the user");
});

module.exports = router;
