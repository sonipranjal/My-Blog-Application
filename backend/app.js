const express = require("express");
const app = express();
const Post = require("./api/models/posts");

const postData = new Post();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/uploads", express.static("uploads"));

app.get("/api/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const foundPost = postData.getIndividualPost(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("NOT FOUND");
  }
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.getPosts());
});

app.listen(3000, () => {
  console.log("listening on localhost 3000");
});
