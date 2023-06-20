import { createPosters } from "./posters.js";
import { fetchPopular, fetchTrailer } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import {
  showInfo,
  showMovie,
  showTV,
  trailerInfo,
  hoverItem,
} from "./functions.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

$("body").scroll(function () {
  if ($("body").scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
});

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
  randomMovie.trailer = randomTrailer;
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
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showMovie(trailer);
});

$(document).on("click", "#playTV", function () {
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showTV(trailer);
});

$(document).on("click", "#more", function () {
  let [id, trailer, type, genres] = $(this).parent().attr("value").split(",");
  showInfo(id, trailer, type, genres, "secondSection");
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
    $(this).offset().top - $(".secondSection").offset().top - 40
  );
  $(".hoverItem").css(
    "left",
    $(this).offset().left - $(".secondSection").offset().left
  );
});

$(".secondSection").on("mouseleave", ".hoverItem", function () {
  $(".hoverItem").remove();
});
