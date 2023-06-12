import {
  fetchTrailer,
  fetchMovieDetails,
  fetchSimilar,
  fetchTrailerTV,
} from "../fetch/fetch.js";
import { moreInfo } from "../mainPage/moreInfo.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

export function showInfo(obj, container) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailer(id).then((data) => data.results);
    let randomElement = trailer[Math.floor(Math.random() * trailer.length)];
    let movie = await fetchMovieDetails(id).then((data) => data);
    let similar = await fetchSimilar(id).then((data) => data.results);
    moreInfo(movie, randomElement.key, similar, container);
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
          <div class="options" id="3">
            <i class="material-icons playBtn" >pause</i>
            <i class="material-icons volume" >volume_off</i>
          </div>
        </div>
    `);
    onYouTubeIframeAPIReady(3, "displayMovie", randomMovie.key);
  })();
}

export function showTV(obj) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailerTV(id).then((data) => data.results);
    let randomShow = trailer[Math.floor(Math.random() * trailer.length)];
    $("#movieShow").append(`    
        <div class="container-fluid p-3" id="movieContainer">
          <i class="material-icons" id="closeInfo" >close</i>
          <div id="displayMovie"></div>
          <div class="options" id="3">
            <i class="material-icons playBtn" >play_arrow</i>
            <i class="material-icons volume" >volume_off</i>
          </div>
        </div>
    `);
    onYouTubeIframeAPIReady(3, "displayMovie", randomShow.key);
  })();
}
