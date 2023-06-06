import { createPosters } from "./posters.js";
import { moreInfo } from "./moreInfo.js";
import {
  fetchPopular,
  fetchTrailer,
  fetchMovieDetails,
  fetchSimilar,
} from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";

import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

Header();
Footer();
Links();

let date = localStorage.getItem("date") ?? 0;
let curr_date = new Date().getDate();
if (curr_date == 0 || curr_date != date) {
  console.log("In");
  let popularMovies = await fetchPopular().then((data) => data.results);
  let randomMovie =
    popularMovies[Math.floor(Math.random() * popularMovies.length)];
  localStorage.setItem("date", curr_date);
  onYouTubeIframeAPIReady("backVideo", "qEVUtrk8_B4");
}

$(".secondSection").on("click", "#play", function () {
  let id = $(this).parent().attr("value");
});

$(".secondSection").on("click", "#more", function () {
  let id = $(this).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailer(id).then((data) => data.results);
    let randomElement = trailer[Math.floor(Math.random() * trailer.length)];
    let movie = await fetchMovieDetails(id).then((data) => data);
    let similar = await fetchSimilar(id).then((data) => data.results);
    moreInfo(movie, randomElement.key, similar);
  })();
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
