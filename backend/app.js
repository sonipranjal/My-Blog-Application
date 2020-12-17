const express = require("express");
const app = express();
const Post = require("./api/models/posts");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});
var upload = multer({ storage: storage });

const getExt = (mimetype) => {
  if (mimetype === "image/jpeg") {
    return ".jpeg";
  } else {
    return ".png";
  }
};

const postData = new Post();

app.use(express.json());

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

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  // console.log(req.file);
  const newPost = {
    id: `${Date.now()}`,
    title: req.body.title,
    content: req.body.content,
    post_image: req.file.path,
    added_date: `${Date.now()}`,
  };
  postData.add(newPost);
  res.status(201).send("ok");
});

app.listen(3000, () => {
  console.log("listening on localhost 3000");
});
