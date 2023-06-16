import { SearchIndian, SearchHollywood, SearchEngTV } from "./fetch/fetch.js";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let movieList = [];
let indianMovie = await SearchIndian().then((data) => data.results);
let englishMovie = await SearchHollywood().then((data) => data.results);
let englishTv = await SearchEngTV().then((data) => data.results);

for (let item of indianMovie) movieList.push(item);
// for (let item of englishMovie) movieList.push(item);
// for (let item of englishTv) movieList.push(item);

shuffleArray(movieList);

function filterData(query) {
  let filterMovie = movieList.map((item) => {
    if (
      item.overview.toLowerCase().includes(query.toLowerCase()) ||
      item.title.toLowerCase().includes(query.toLowerCase())
    ) {
      return item;
    }
  });
  console.log(filterMovie);
}

$(document).on("keyup", ".search input", function () {
  let query = $(this).val();
  filterData(query);
});

$("#header").on("click", ".nav-link", function () {
  let value = $(this).attr("value");
  console.log(value);
  if (value != "logout") {
    window.location.href = value;
  } else if (value == "logout") {
    sessionStorage.removeItem("user_id");
    window.location.href = "/";
  }
});

if (sessionStorage.getItem("user_id") == null) window.location.href = "/";

export function Header() {
  let base_url = localStorage.getItem("base_url");
  $("#header").append(`
<nav class="navbar navbar-expand-sm fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">
      <img id="logo" src="${base_url}/images/logo.png" onclick="window.location.href='${base_url}';" />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
           <a class="nav-link" value="showMovies.html">Home</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" value="tvShows.html">TV Shows</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" value="movies.html">Movies</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" value="newPopular.html">New & Popular</a>
        </li>
        <li class="nav-item">
           <a class="nav-link" value="myList.html">My List</a>
        </li>
      </ul>
      <form class="d-flex text-white">
        <div class="search">
         <i class="material-icons" id="searchBtn">search</i>
         <input type="text" class="form-control form-control-sm" placeholder="Search By Title">
         <i class="material-icons" id="closeSearch">close</i>
        </div>
        <div>
          <button type="button" class="btn" style="outline:none;border:none;color:white">
        <i class="material-icons">notifications_none</i>
        </button>
        </div>
        <div class="dropstart">
          <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false" style="outline:none;border:none;color:white">
          <i class="material-icons">account_circle</i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li>
              <button class="dropdown-item nav-link" value="logout" type="button">
                  Profile
              </button>
            </li>
            <li>
              <button class="dropdown-item nav-link" value="logout" type="button">
                Logout</button>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</nav>
`);
}

$(document).on("click", "#searchBtn", function () {
  $(".search input").css("display", "inline-block");
  $(".search").css({
    width: "max-content",
    border: "2px solid white",
    "background-color": "black",
  });
  $("#closeSearch").css("display", "inline-block");
  $(".navbar").css("background-color", "black");
  $(`<div class="searchContent"></div>`).appendTo("body");
});

$(document).on("click", "#closeSearch", function () {
  $(".search input").css("display", "none");
  $(".search").css({
    width: "20%",
    border: "none",
    "background-color": "transparent",
  });
  $(".searchContent").remove();
  $(".navbar").css("background-color", "transparent");
  $("#closeSearch").css("display", "none");
});
