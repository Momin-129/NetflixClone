import { createPosters } from "./posters.js";
import { fetchPopularTV, fetchTrailerTV, TVList } from "../fetch/fetch.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

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
