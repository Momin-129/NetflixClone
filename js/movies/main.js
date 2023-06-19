import { createPosters } from "./posters.js";
import { fetchPopular, fetchTrailer } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import {
  showInfo,
  showMovie,
  trailerInfo,
  hoverItem,
} from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

$("body").scroll(function () {
  if ($("body").scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
});

Header();
Footer();
Links();

$("#header").hide();
$(".firstSection").hide();
$(".secondSection").hide();
$("#footer").hide();

let date = localStorage.getItem("moviedate") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomMovie = "";

createPosters();

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("moviedate", curr_date);
  let popularMovies = await fetchPopular().then((data) => data.results);
  randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
  let trailer = await fetchTrailer(randomMovie.id).then((data) => data.results);
  randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
  localStorage.setItem("movie", JSON.stringify(randomMovie));
  localStorage.setItem("trailerMovie", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerMovie");
  randomMovie = JSON.parse(localStorage.getItem("movie"));
}
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);
trailerInfo(randomMovie);

$(document).on("click", "#playMovie", function () {
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showMovie(trailer);
});

$(document).on("click", "#more", function () {
  let [id, trailer, type] = $(this).parent().attr("value").split(",");
  showInfo(id, trailer, type, "secondSection");
});

$(".secondSection").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

$(document).on("click", "#fav", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let id = $(this).parent().attr("value").split(",")[0];
  let type = $(this).parent().attr("value").split(",")[2];

  if ($(this).html() == "add_circle_outline") {
    if (type == "M O V I E") users[user_id].favourites.push(id);
    else users[user_id].favouritesTV.push(id);
    $(this).html("check_circle");
  } else {
    if (type == "M O V I E") {
      let index = users[user_id].favourites.indexOf(id.toString());
      users[user_id].favourites.splice(index, 1);
    } else {
      let index = users[user_id].favouritesTV.indexOf(id.toString());
      users[user_id].favouritesTV.splice(index, 1);
    }
    $(this).html("add_circle_outline");
  }
  localStorage.setItem("users", JSON.stringify(users));
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});

$(".secondSection").on("mouseenter", ".item", function () {
  let [id, trailer, type, genres] = $(this).attr("value").split(",");
  hoverItem(id, trailer, type, genres);
  $(".hoverItem").css(
    "top",
    $(this).offset().top - $(".secondSection").offset().top - 20
  );
  $(".hoverItem").css(
    "left",
    $(this).offset().left - $(".secondSection").offset().left
  );
});

$(".secondSection").on("mouseleave", ".hoverItem", function () {
  $(".hoverItem").remove();
});

// Generate random trailer every day

// $(document).on("click", "#playMovie", function () {
//   showMovie($(this));
// });
//
// $(document).on("click", "#fav", function () {
//   let users = JSON.parse(localStorage.getItem("users")) ?? [];
//   let user_id = sessionStorage.getItem("user_id");
//   let movie_id = $(this).parent().attr("value");
//   if ($(this).html() == "add_circle_outline") {
//     users[user_id].favourites.push(movie_id);
//     $(`div[value="${movie_id}"] i[id='fav']`).html("check_circle");
//   } else {
//     let index = users[user_id].favourites.indexOf(movie_id.toString());
//     users[user_id].favourites.splice(index, 1);
//     $(`div[value="${movie_id}"] i[id='fav']`).html("add_circle_outline");
//   }
//   $("#myList").load(location.href + " #myList");
//   localStorage.setItem("users", JSON.stringify(users));
// });
//
// $(document).on("click", "#more", function () {
//   showInfo($(this), "secondSection");
// });
//
// $(".secondSection").on("click", "#closeInfo", function () {
//   $(".moreInfo").remove();
// });
//
// $("#movieShow").on("click", "#closeInfo", function () {
//   $("#movieContainer").remove();
// });
