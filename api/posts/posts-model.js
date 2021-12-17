const db = require("../../data/db-config");

module.exports.getAll = async () => {
  return await db("posts");
};

const getById = async (post_id) => {
  return await db("posts").where({ post_id }).first();
};

module.exports.createNew = async (newPost) => {
  const [newPostId] = await db("posts").insert(newPost);

  return getById(newPostId);
};

module.exports.update = async (post, id) => {
  await db("posts").where("post_id", id).update(post);

  return getById(id);
};

module.exports.remove = async (post, id) => {
  await db("posts").where("post_id", id).del();

  return post;
};
