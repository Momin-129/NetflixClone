import { createPosters } from "./posters.js";
import { fetchPopularTV, fetchTrailerTV } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import {
  showInfo,
  showMovie,
  showTV,
  trailerInfo,
  hoverItem,
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
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);
trailerInfo(randomTV);

// Generate random trailer every day

$(document).on("click", "#playTV", function () {
  let [id, trailer] = $(this).parent().attr("value").split(",");
  showTV(trailer);
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
  let movie_id = $(this).parent().attr("value").split(",")[0];
  if ($(this).html() == "add_circle_outline") {
    users[user_id].favourites.push(movie_id);
    $(this).html("check_circle");
  } else {
    let index = users[user_id].favourites.indexOf(movie_id.toString());
    users[user_id].favourites.splice(index, 1);
    $(this).html("add_circle_outline");
  }
  $("#myList").load(location.href + " #myList");
  localStorage.setItem("users", JSON.stringify(users));
});

$("#movieShow").on("click", "#closeInfo", function () {
  $("#movieContainer").remove();
});

$(".secondSection").on("mouseenter", ".item", function () {
  let [id, trailer, type] = $(this).attr("value").split(",");
  hoverItem(id, trailer, type);
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
// $(document).on("click", "#playTV", function () {
//   showMovie($(this));
// });
//
// $(document).on("click", "#fav", function () {
//   let users = JSON.parse(localStorage.getItem("users")) ?? [];
//   let user_id = sessionStorage.getItem("user_id");
//   let movie_id = $(this).parent().attr("value");
//   if ($(this).html() == "add_circle_outline") {
//     users[user_id].favouritesTV.push(movie_id);
//     $(`div[value="${movie_id}"] i[id='fav']`).html("check_circle");
//   } else {
//     let index = users[user_id].favouritesTV.indexOf(movie_id.toString());
//     users[user_id].favouritesTV.splice(index, 1);
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
//
// window.onscroll = function () {
//   if ($(window).scrollTop() >= 200) {
//     $(".navbar").css("background-color", "black");
//   } else $(".navbar").css("background-color", "transparent");
// };
