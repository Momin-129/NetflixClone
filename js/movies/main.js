import { createPosters } from "./posters.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

let movie = JSON.parse(localStorage.getItem("movie"));

// creates iframe for video of random movie
onYouTubeIframeAPIReady(0, "backVideo", movie.trailer);

// set information of random movie
trailerInfo(movie, movie.genre);

// call function to create posters for carousel
createPosters();
