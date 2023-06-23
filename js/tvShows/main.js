import { createPosters } from "./posters.js";
import { trailerInfo } from "../mainPage/functions.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

let tv = JSON.parse(localStorage.getItem("tv"));
// creates iframe for video of random series
onYouTubeIframeAPIReady(0, "backVideo", tv.trailer);

// set information of random movie
trailerInfo(tv, tv.genre);

// call function to create posters for carousel
createPosters();
