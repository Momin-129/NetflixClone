import {
  fetchTrailer,
  fetchMovieDetails,
  fetchSimilar,
  fetchTrailerTV,
} from "../fetch/fetch.js";
import { moreInfo } from "./moreInfo.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

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

export function hoverItem(id, trailer) {
  $(".secondSection").append(`
      <div class="hoverItem" value="${id}">
        <div class="trailerBox">
        <div id="itemTrailer"></div>
        </div>
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">add_circle_outline</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
  `);
  onYouTubeIframeAPIReady(4, "itemTrailer", trailer);
}

export function trailerInfo(movie) {
  let name = movie.title ? movie.title : movie.name;
  let type = "M O V I E";
  $(".details").append(`
         <div class="options" value="${movie.id}" id="0">
          <img src="../images/Nlogo.png" alt="" />${type}
          <p class="title">${name}</p>
          <p class="watch">Watch ${name} Now</p>
          <span id="desc">
            ${movie.overview}
          </span>
          <button type="button" id="playMovie"  class="btn mt-2">
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
  $(".loader").remove();
  $("#header").show();
  $(".firstSection").show();
  $(".secondSection").show();
  $("#footer").show();
}
