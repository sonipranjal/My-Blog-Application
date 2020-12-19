/**
 * TODO (Together): Create getPostIdParam to get the id of the post to use in the request later
 * TODO: Complete getPost function to get post data from API
 * TODO: Complete buildPost function to fill in the post data in the post.html file using ids
 */

const API_URL = "https://protected-earth-95891.herokuapp.com/api/posts/";
const API_BASE_URL = "https://protected-earth-95891.herokuapp.com/";

window.onload = () => {
  getPost();
};

const getPostIdParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //   console.log(urlParams.get("id"));
  return urlParams.get("id");
};

const getPost = () => {
  // CODE GOES HERE
  const postId = getPostIdParam();
  const url = `${API_URL}${postId}`;
  fetch(url, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildPost(data);
    });
};

const buildPost = (data) => {
  // HINT: Convert the date number to a Date string
  //   console.log(data);
  const date = new Date(parseInt(data.added_date)).toDateString();
  document.getElementById("individual-post-title").innerText = data.title;
  document.getElementById(
    "individual-post-date"
  ).innerText = `Published on ${date}`;
  document.getElementById("individual-post-content").innerText = data.content;

  document.querySelector(
    "header"
  ).style.backgroundImage = `url(${API_BASE_URL}${data.post_image})`;
};
