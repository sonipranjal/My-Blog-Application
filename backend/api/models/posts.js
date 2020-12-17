const PATH = "./data.json";
const fs = require("fs");

class Post {
  getPosts() {
    return this.readData();
  }
  getIndividualPost(postId) {
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id === postId);
    return foundPost;
  }
  add(newPost) {
    const currentPost = this.readData();
    currentPost.unshift(newPost);
    this.storeData(currentPost);
  }
  readData() {
    let rawData = fs.readFileSync(PATH);
    let posts = JSON.parse(rawData);
    return posts;
  }
  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
