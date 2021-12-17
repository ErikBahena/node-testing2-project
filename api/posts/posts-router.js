const router = require("express").Router();
const Posts = require("./posts-model");

router.get("/", (req, res, next) => {
  Posts.getAll()
    .then((posts) => res.status(200).json(posts))
    .catch(next);
});

router.post("/", (req, res, next) => {
  Posts.createNew(req.body)
    .then((newPost) => res.status(201).json(newPost))
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  Posts.update(req.body, req.params.id)
    .then((updatedPost) => res.status(200).json(updatedPost))
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
  res.json("delete the post");
});

module.exports = router;
