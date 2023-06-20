import { SearchIndian, SearchHollywood, SearchEngTV } from "./fetch/fetch.js";
import {
  fetchTrailer,
  fetchTrailerTV,
  fetchPoster,
  fetchPosterTV,
} from "./fetch/fetch.js";

let base_url = localStorage.getItem("base_url");
if (sessionStorage.getItem("user_id") == null) {
  window.location.href = base_url;
}

$("#header").on("click", ".nav-link", function () {
  let value = $(this).attr("value");
  console.log(value);
  if (value != "logout") {
    window.location.href = value;
  } else if (value == "logout") {
    sessionStorage.removeItem("user_id");
    window.location.href = base_url;
  }
});

let dropPos = "dropleft";
var viewportWidth = $(window).width();
if (viewportWidth <= 600) {
  dropPos = "dropend";
} else dropPos = "dropstart";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

let movieList = [];
for (let i = 1; i < 4; i++) {
  let indianMovie = await SearchIndian(i).then((data) => data.results);
  let englishMovie = await SearchHollywood(i).then((data) => data.results);
  let englishTv = await SearchEngTV(i).then((data) => data.results);
  for (let item of indianMovie) movieList.push(item);
  for (let item of englishMovie) movieList.push(item);
  for (let item of englishTv) movieList.push(item);
}

shuffleArray(movieList);

function filterData(query) {
  let filterMovie = movieList.filter((item) => {
    let name = item.title ? item.title : item.name;
    if (
      item.overview.toLowerCase().includes(query.toLowerCase()) ||
      name.toLowerCase().replace(/-/g, "").includes(query.toLowerCase())
    ) {
      return item;
    }
  });

  for (let item of filterMovie) {
    (async function () {
      let type = item.title ? "M O V I E" : "S E R I E S";
      let trailer = "";
      let poster = "";
      if (type == "M O V I E")
        trailer = await fetchTrailer(item.id).then((data) => data.results);
      else trailer = await fetchTrailerTV(item.id).then((data) => data.results);

      if (trailer.length > 0) {
        let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
        item.trailer = randomMovie.key;
        item.type = type;
        if (type == "M O V I E")
          poster = await fetchPoster(item.id).then((data) => data.backdrops);
        else
          poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
        for (let j of poster) {
          if (j.iso_639_1 != null && j.iso_639_1 == "en") {
            item.poster = j.file_path;
            break;
          } else item.poster = j.file_path;
        }
      }
    })();
  }
  for (let item of filterMovie) {
    let genres = [];
    if (item.genre_ids) genres = item.genre_ids;
    else {
      for (let genre of item.genres) {
        genres.push(genre.id);
      }
    }
    let values = [item.id, item.trailer, item.type, genres.join("-")];
    if (item.trailer != undefined && item.poster != undefined) {
      $(`#searchContent`).append(
        `
        <div class="col-md-2 col-sm-12">
            <div class="item" value="${values}">
                 <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
            </div>
        </div>
        `
      );
    }
  }
}

$(document).on("keyup", ".search input", function () {
  $("#searchContent").html("");
  let query = $(this).val();
  if (query != "") filterData(query);
  else $("searchContent").html("");
});

$(document).on("click", "#searchBtn", function () {
  $(".search input").css("display", "inline-block");
  $(".search input").focus();
  $(".search").css({
    width: "max-content",
    border: "2px solid white",
    "background-color": "black",
  });
  $(".firstSection").css("pointer-events", "none");
  $("#closeSearch").css("display", "inline-block");
  $(".navbar").css("background-color", "black");
  $(` <div class="slide">
        <div class="row" id="searchContent"></div>
      </div>
    `).appendTo(".secondSection");
});

$(document).on("click", "#closeSearch", function () {
  $(".search input").css("display", "none");
  $(".search").css({
    width: "20%",
    border: "none",
    "background-color": "transparent",
  });
  $(".firstSection").css("pointer-events", "auto");
  $("#searchContent").remove();
  $(".navbar").css("background-color", "transparent");
  $("#closeSearch").css("display", "none");
});

export function Header() {
  let base_url = localStorage.getItem("base_url");
  $("#header").append(`
<nav class="navbar navbar-expand-sm fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)">
      <img id="logo" src="${base_url}/images/logo.png" onclick="window.location.href='${base_url}';" />
    </a>
    <button id="collapseBtn" class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      Browse
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
        <div class="${dropPos}">
          <button type="button" class="btn" data-bs-toggle="dropdown" aria-expanded="false" style="outline:none;border:none;color:white">
          <img src="../images/avatar.png" width=30>
          </button>
          <ul class="dropdown-menu dropdown-menu-dark p-3" aria-labelledby="dropdownMenu2">
            <li>
              <button class="dropdown-item nav-link" value="account.html" type="button">
                  Account
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
