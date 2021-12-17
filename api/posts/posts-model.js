const db = require("../../data/db-config");

module.exports.getAll = async () => {
  return await db("posts");
};

module.exports.getById = async (post_id) => {
  return await db("posts").where({ post_id }).first();
};

module.exports.createNew = async (newPost) => {
  const [newPostId] = await db("posts").insert(newPost);

  return getById(newPostId);
};

module.exports.update = async (updatedPost) => {
  const { post_id } = updatedPost;

  await db("posts").update(updatedPost);

  return getById(post_id);
};

module.exports.remove = async (post) => {
  const { post_id } = post;

  await db("posts").where({ post_id }).del();

  return post;
};
