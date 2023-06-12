import { createPosters } from "./posters.js";
import { fetchPopular, fetchTrailer } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import { showInfo, showMovie, trailerInfo, hoverItem } from "./functions.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

$("#header").hide();
$(".firstSection").hide();
$(".secondSection").hide();
$("#footer").hide();

Header();
Footer();
Links();

let date = localStorage.getItem("date") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomMovie = "";

createPosters();

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("date", curr_date);
  let popularMovies = await fetchPopular().then((data) => data.results);
  randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
  let trailer = await fetchTrailer(randomMovie.id).then((data) => data.results);
  randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
  localStorage.setItem("home", JSON.stringify(randomMovie));
  localStorage.setItem("trailerHome", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerHome");
  randomMovie = JSON.parse(localStorage.getItem("home"));
}
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);
trailerInfo(randomMovie);

// Generate random trailer every day

$(document).on("click", "#playMovie", function () {
  showMovie($(this));
});

$(document).on("click", "#fav", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let movie_id = $(this).parent().attr("value");
  if ($(this).html() == "add_circle_outline") {
    users[user_id].favourites.push(movie_id);
    $(`div[value="${movie_id}"] i[id='fav']`).html("check_circle");
  } else {
    let index = users[user_id].favourites.indexOf(movie_id.toString());
    users[user_id].favourites.splice(index, 1);
    $(`div[value="${movie_id}"] i[id='fav']`).html("add_circle_outline");
  }
  $("#myList").load(location.href + " #myList");
  localStorage.setItem("users", JSON.stringify(users));
});

$(document).on("click", "#more", function () {
  showInfo($(this), "secondSection");
});

$(".secondSection").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});

$(".secondSection").on("mouseenter", ".item", function () {
  let [id, trailer] = $(this).attr("value").split(",");
  hoverItem(id,trailer);
  $(".hoverItem").css(
    "top",
    $(this).offset().top - $(".secondSection").offset().top
  );
  $(".hoverItem").css(
    "left",
    $(this).offset().left - $(".secondSection").offset().left
  );
});

$(".secondSection").on("mouseleave", ".hoverItem", function () {
  $(".hoverItem").remove();
});

window.onscroll = function () {
  if ($(window).scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
};
