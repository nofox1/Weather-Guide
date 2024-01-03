var searchButton = document.querySelector(".search-btn");
var searchInput = document.querySelector(".search-input");

var APIKEY = "8de4872bdf9f760190704f0f4b640c4a";

addEventListener("click", searchButton);

function setParam() {
  var paramsArr = document.location.search.split("&");

  var query = paramsArr[0].split("=").pop();
  var format = paramsArr[1].split("=").pop();

  searchUrl(query, format);
}
