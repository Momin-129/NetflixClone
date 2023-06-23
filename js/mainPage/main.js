import { createPosters } from "./posters.js";
import { trailerInfo } from "./functions.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

let home = JSON.parse(localStorage.getItem("home"));
onYouTubeIframeAPIReady(0, "backVideo", home.trailer);

// set information of random movie.
trailerInfo(home, home.genre);

// call function to create posters for carousel
createPosters();
