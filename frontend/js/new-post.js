/**
 * TODO: Finish submitNewPost function to submit form data to the API
 */

const API_URL = "https://protected-earth-95891.herokuapp.com/api/posts";

const submitNewPost = () => {
  // HINT: Use FormData to store data to send over
  // HINT: Redirect the user to home page after successful submission
  const data = new FormData();

  const title = document.getElementById("form-post-title").value;
  const content = document.getElementById("form-post-content").value;
  const input = document.getElementById("form-post-image");

  data.append("post-image", input.files[0]);
  data.append("title", title);
  data.append("content", content);

  fetch(API_URL, {
    method: "POST",
    body: data,
  }).then(() => {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
};
