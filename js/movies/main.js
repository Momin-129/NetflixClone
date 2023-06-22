import { createPosters } from "./posters.js";
import {
  fetchPopular,
  fetchTrailer,
  fetchMovieDetails,
} from "../fetch/fetch.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";
let date = localStorage.getItem("moviedate") ?? 0;
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
if (date == 0 || curr_date != date) {
  localStorage.setItem("moviedate", curr_date);
  localStorage.setItem("movie", JSON.stringify(randomMovie));
  localStorage.setItem("trailerMovie", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerMovie");
  randomMovie = JSON.parse(localStorage.getItem("movie"));
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

// set information of random movie
trailerInfo(randomMovie, genreList);
