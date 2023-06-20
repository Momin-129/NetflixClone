import { createPosters } from "./posters.js";
import { fetchPopularTV, fetchTrailerTV, TVList } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import {
  showInfo,
  showTV,
  trailerInfo,
  hoverItem,
  rgba2hex,
} from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

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

let date = localStorage.getItem("tvdate") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomTV = "";

createPosters();

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("tvdate", curr_date);
  let popularTV = await fetchPopularTV().then((data) => data.results);
  randomTV = popularTV[Math.floor(Math.random() * popularTV.length)];
  let trailer = await fetchTrailerTV(randomTV.id).then((data) => data.results);
  randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
  randomTV.trailer = randomTrailer;
  localStorage.setItem("tv", JSON.stringify(randomTV));
  localStorage.setItem("trailerTV", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerTV");
  randomTV = JSON.parse(localStorage.getItem("tv"));
}
let tvGenres = await TVList().then((data) => data.genres);
let tvGenMap = new Map();
tvGenres.forEach((element) => {
  tvGenMap.set(element.id, element.name);
});
let genres = [];
genres = randomTV.genre_ids;
let genreList = genres;
for (let i = 0; i < genreList.length; i++) {
  let id = parseInt(genreList[i]);
  let genreName = tvGenMap.get(id);
  genreList[i] = genreName;
}
genreList = genreList.join(" . ");
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);
trailerInfo(randomTV, genreList);

// Generate random trailer every day

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

$(document).on("click", "#like", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let [id] = $(this).parent().attr("value").split(",");
  let color = $(this).css("color");
  if (rgba2hex(color) == "#0d0d0d") {
    users[user_id].liked.push(id);
    $(this).css("color", "#fff");
  } else {
    let index = users[user_id].liked.indexOf(id.toString());
    users[user_id].liked.splice(index, 1);
    $(this).css("color", "#0d0d0d");
  }
  localStorage.setItem("users", JSON.stringify(users));
});

$(document).on("click", "#fav", function () {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let tv_id = $(this).parent().attr("value").split(",")[0];

  if ($(this).html() == "add_circle_outline") {
    users[user_id].favouritesTV.push(tv_id);
    $(this).html("check_circle");
  } else {
    let index = users[user_id].favouritesTV.indexOf(tv_id.toString());
    users[user_id].favouritesTV.splice(index, 1);
    $(this).html("add_circle_outline");
  }
  $("#myList").load(location.href + " #myList");
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
