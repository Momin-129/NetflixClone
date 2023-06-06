import { createPosters } from "./posters.js";
import { moreInfo } from "./moreInfo.js";
import { fetchTrailer, fetchMovieDetails } from "../fetch/fetch.js";
import { Header } from "../headerMain.js";
import { Footer } from "../footerMain.js";
import { Links } from "../links.js";

Header();
Footer();
Links();

$(".secondSection").on("click", "#play", function () {
  let id = $(this).parent().attr("value");
});

$(".secondSection").on("click", "#more", function () {
  let id = $(this).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailer(id).then((data) => data.results);
    let randomElement = trailer[Math.floor(Math.random() * trailer.length)];
    let movie = await fetchMovieDetails(id).then((data) => data);
    moreInfo(movie, randomElement.key);
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
