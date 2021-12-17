const db = require("../../data/db-config");

module.exports.getAll = async () => {
  return await db("posts");
};

module.exports.getById = async (post_id) => {
  return await db("posts").where({ post_id }).first();
};

module.exports.createNew = async (newPost) => {
  const [newPostId] = await db("posts").insert(newPost);

  return this.getById(newPostId);
};

module.exports.update = async (post, id) => {
  await db("posts").where("post_id", id).update(post);

  return this.getById(id);
};

module.exports.remove = async (id) => {
  await db("posts").where("post_id", id).del();

  return this.getAll();
};
