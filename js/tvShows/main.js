import { createPosters } from "./posters.js";
import {
  fetchPopularTV,
  fetchTrailerTV,
  fetchTVDetails,
} from "../fetch/fetch.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

let date = localStorage.getItem("tvdate") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomTV = "";

// call function to create posters for carousel
createPosters();

// set a radom movie per day.
let popularTV = await fetchPopularTV().then((data) => data.results);
randomTV = popularTV[Math.floor(Math.random() * popularTV.length)];
let trailer = await fetchTrailerTV(randomTV.id).then((data) => data.results);
randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
randomTV.trailer = randomTrailer;

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("tvdate", curr_date);
  localStorage.setItem("tv", JSON.stringify(randomTV));
  localStorage.setItem("trailerTV", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerTV");
  randomTV = JSON.parse(localStorage.getItem("tv"));
}

// to fetch genres of random trailer.
let genreList = [];
let genre = await fetchTVDetails(randomTV.id).then((data) => data.genres);
for (let item in genre) {
  genreList.push(genre[item].name);
}
genreList = genreList.join(" . ");

// creates iframe for video of random series
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);

// set information of random movie
trailerInfo(randomTV, genreList);
