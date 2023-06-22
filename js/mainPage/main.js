import { createPosters } from "./posters.js";
import {
  fetchPopular,
  fetchTrailer,
  fetchMovieDetails,
} from "../fetch/fetch.js";
import { trailerInfo } from "./functions.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

let date = localStorage.getItem("date") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomMovie = "";

// call function to create posters for carousel
createPosters();

// set a radom movie per day.
let popularMovies = await fetchPopular().then((data) => data.results);
randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
let trailer = await fetchTrailer(randomMovie.id).then((data) => data.results);
randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
randomMovie.trailer = randomTrailer;
if (date == 0 || curr_date != date) {
  localStorage.setItem("date", curr_date);
  localStorage.setItem("home", JSON.stringify(randomMovie));
  localStorage.setItem("trailerHome", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerHome");
  randomMovie = JSON.parse(localStorage.getItem("home"));
}

// to fetch genres of random movie.
let genreList = [];
let genre = await fetchMovieDetails(item.id).then((data) => data.genres);
for (let item in genre) {
  genreList.push(genre[item].name);
}
genreList = genreList.join(" . ");

// creates iframe for video of random movie
onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);

// set information of random movie.
trailerInfo(randomMovie, genreList);
