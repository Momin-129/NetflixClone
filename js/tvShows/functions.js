import {
  fetchTrailerTV,
  fetchShowDetails,
  fetchSimilarTV,
} from "../fetch/fetch.js";
import { moreInfo } from "../mainPage/moreInfo.js";
import { onYouTubeIframeAPIReady } from "../mainPage/YouTubeApi.js";

export function showInfo(obj, container) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailerTV(id).then((data) => data.results);
    let randomElement = trailer[Math.floor(Math.random() * trailer.length)];
    let movie = await fetchShowDetails(id).then((data) => data);
    let similar = await fetchSimilarTV(id).then((data) => data.results);
    moreInfo(movie, randomElement.key, similar, container);
  })();
}

export function showMovie(obj) {
  let id = $(obj).parent().attr("value");
  (async function () {
    let trailer = await fetchTrailerTV(id).then((data) => data.results);
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

export function trailerInfo(movie) {
  let name = movie.title ? movie.title : movie.name;
  let type = movie.tilte ? "M O V I E" : "S E R I E S";
  $(".details").append(`
         <div class="options" value="${movie.id}" id="0">
          <img src="../images/Nlogo.png" alt="" />${type}
          <p class="title">${name}</p>
          <p class="watch">Watch ${name} Now</p>
          <span id="desc">
            ${movie.overview}
          </span>
          <button type="button" id="playTV"  class="btn mt-2">
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
