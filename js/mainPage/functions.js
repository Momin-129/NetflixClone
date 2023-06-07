import {
  fetchTrailer,
  fetchMovieDetails,
  fetchSimilar,
} from "../fetch/fetch.js";
import { moreInfo } from "./moreInfo.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

export function showInfo(obj) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailer(id).then((data) => data.results);
    let randomElement = trailer[Math.floor(Math.random() * trailer.length)];
    let movie = await fetchMovieDetails(id).then((data) => data);
    let similar = await fetchSimilar(id).then((data) => data.results);
    moreInfo(movie, randomElement.key, similar);
  })();
}

export function showMovie(obj) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailer(id).then((data) => data.results);
    let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
    $("#movieShow").append(`    
        <div class="container-fluid p-3" id="movieContainer">
          <i class="material-icons" id="closeInfo" >close</i>
          <div id="displayMovie"></div>
        </div>
    `);
    onYouTubeIframeAPIReady(3, "displayMovie", randomMovie.key);
  })();
}

export function trailerInfo(movie) {
  $(".details").append(`
         <div class="options" value="${movie.id}" id="0">
          <img src="../images/Nlogo.png" alt="" />M O V I E
          <p class="title">${movie.title}</p>
          <p class="watch">Watch ${movie.title} Now</p>
          <span id="desc">
            ${movie.overview}
          </span>
          <button type="button" id="play"  class="btn mt-2">
            <i class="material-icons">play_arrow</i>
            <span>Play</span>
          </button>
          <button type="button" id="more" class="btn mt-2">
            <i class="material-icons">info_outline</i>
            <span>More Info</span>
          </button>
          <i class="material-icons volume" style="float: right; cursor: pointer"
            >volume_off</i
          >
        </div>
`);
}
