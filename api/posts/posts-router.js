const router = require("express").Router();
const Posts = require("./posts-model");

router.get("/", (req, res, next) => {
  Posts.getAll()
    .then((posts) => res.status(200).json(posts))
    .catch(next);
});
router.get("/:id", (req, res, next) => {
  Posts.getById(req.params.id)
    .then((post) => res.status(200).json(post))
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
  Posts.remove(req.params.id)
    .then((allPosts) => res.status(200).json(allPosts))
    .catch(next);
});

module.exports = router;
