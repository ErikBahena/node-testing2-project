const express = require("express");
const server = express();

server.use(express.json());

const usersRouter = require("./users/users-router");
const postsRouter = require("./posts/posts-router");

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
