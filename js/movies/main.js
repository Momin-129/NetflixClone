import { createPosters } from "./posters.js";
import { fetchPopular, fetchTrailer, MovieList } from "../fetch/fetch.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";
let date = localStorage.getItem("moviedate") ?? 0;
let curr_date = new Date().getDate();
let randomTrailer = "";
let randomMovie = "";

createPosters();

// Generate random trailer every day
if (date == 0 || curr_date != date) {
  localStorage.setItem("moviedate", curr_date);
  let popularMovies = await fetchPopular().then((data) => data.results);
  randomMovie = popularMovies[Math.floor(Math.random() * popularMovies.length)];
  let trailer = await fetchTrailer(randomMovie.id).then((data) => data.results);
  randomTrailer = trailer[Math.floor(Math.random() * trailer.length)].key;
  localStorage.setItem("movie", JSON.stringify(randomMovie));
  localStorage.setItem("trailerMovie", randomTrailer);
} else {
  randomTrailer = localStorage.getItem("trailerMovie");
  randomMovie = JSON.parse(localStorage.getItem("movie"));
}

let movieGenres = await MovieList().then((data) => data.genres);
let movieGenMap = new Map();
movieGenres.forEach((element) => {
  movieGenMap.set(element.id, element.name);
});
let genres = [];
genres = randomMovie.genre_ids;
let genreList = genres;
for (let i = 0; i < genreList.length; i++) {
  let id = parseInt(genreList[i]);
  let genreName = movieGenMap.get(id);
  genreList[i] = genreName;
}
genreList = genreList.join(" . ");

onYouTubeIframeAPIReady(0, "backVideo", randomTrailer);
trailerInfo(randomMovie, genreList);

// Generate random trailer every day
