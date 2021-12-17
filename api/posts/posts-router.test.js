const server = require("../server");
const request = require("supertest");
const db = require("../../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("sanity check", () => {
  test("environment is correct", () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("posts router", () => {
  test("[GET] api/posts returns all posts", async () => {
    const res = await request(server).get("/api/posts");
    expect(res.body).toMatchSnapshot();
  });
  test("[GET] api/posts/id returns post by id", async () => {
    const res = await request(server).get("/api/posts/1");

    const postFromDb = await db("posts").where("post_id", 1).first();

    expect(res.body).toMatchObject(postFromDb);
  });

  test("[POST] creates a new post in the database related to the user_id", async () => {
    await request(server)
      .post("/api/posts")
      .send({ post_title: "my car", user_id: 2 });

    const posts = await db("posts").where("user_id", 2);
    expect(posts).toHaveLength(2);
  });

  test("[POST] api/posts returns newly created post", async () => {
    const res = await request(server)
      .post("/api/posts")
      .send({ post_title: "my car", user_id: 2 });

    expect(res.body).toMatchObject({ post_title: "my car", user_id: 2 });
  });

  test("[POST] returns status 201", async () => {
    const res = await request(server)
      .post("/api/posts")
      .send({ post_title: "my car", user_id: 2 });

    expect(res.status).toBe(201);
  });

  test("[PUT] updates post in database", async () => {
    await request(server)
      .post("/api/posts")
      .send({ post_title: "my car", user_id: 2 });

    const oldPost = await db("posts").where("post_id", 5).first();
    expect(oldPost).toMatchObject({ post_title: "my car" });

    await request(server)
      .put("/api/posts/5")
      .send({ post_title: "my new car", user_id: 2 });

    const updatedPost = await db("posts").where("post_id", 5).first();
    expect(updatedPost).toMatchObject({ post_title: "my new car" });
  });
  test("[PUT] returns updated post", async () => {
    await request(server)
      .post("/api/posts")
      .send({ post_title: "my car", user_id: 2 });

    const res = await request(server)
      .put("/api/posts/5")
      .send({ post_title: "my new car", user_id: 2 });

    expect(res.body).toMatchObject({ post_title: "my new car", user_id: 2 });
  });
  test("[PUT] returns status 201", async () => {
    const res = await request(server)
      .put("/api/posts/4")
      .send({ post_title: "my car" });

    expect(res.status).toBe(200);
  });
  test("[DELETE] deletes post from database", async () => {
    await request(server).delete("/api/posts/4");

    const deletedPost = await db("posts").where("post_id", 4).first();

    expect(deletedPost).toBeFalsy();
  });
  test("[DELETE] returns all posts left on database", async () => {
    await request(server).delete("/api/posts/4");

    const allPostsOnDb = await db("posts");

    expect(allPostsOnDb).toHaveLength(3);
  });
  test("[DELETE] returns status code of 200", async () => {
    const res = await request(server).delete("/api/posts/4");
    expect(res.status).toBe(200);
  });
});
