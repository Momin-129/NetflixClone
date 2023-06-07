import { createPosters } from "./posters.js";
import { fetchPopular, fetchTrailer } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";
import { showInfo, trailerInfo } from "./functions.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

Header();
Footer();
Links();

let date = localStorage.getItem("date") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomMovie = "";

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("date", curr_date);
  let popularMovies = await fetchPopular().then((data) => data.results);
  randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
  let trailer = await fetchTrailer(randomMovie.id).then((data) => data.results);
  randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
  localStorage.setItem("movie", JSON.stringify(randomMovie));
  localStorage.setItem("trailer", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailer");
  randomMovie = JSON.parse(localStorage.getItem("movie"));
}
onYouTubeIframeAPIReady("backVideo", randomTrailer);
trailerInfo(randomMovie);

// Generate random trailer every day

$(".secondSection").on("click", "#play", function () {
  let id = $(this).parent().attr("value");
});

$(document).on("click", "#more", function () {
  showInfo($(this));
});

$(".secondSection").on("click", "#closeInfo", function () {
  $(".moreInfo").remove();
});

window.onscroll = function () {
  if ($(window).scrollTop() >= 200) {
    $(".navbar").css("background-color", "black");
  } else $(".navbar").css("background-color", "transparent");
};

createPosters();
