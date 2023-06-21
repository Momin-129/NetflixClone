import {
  fetchMovieDetails,
  fetchSimilar,
  fetchShowDetails,
  fetchSimilarTV,
} from "../fetch/fetch.js";
import { moreInfo } from "./moreInfo.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

export const rgba2hex = (rgba) =>
  `#${rgba
    .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
    .slice(1)
    .map((n, i) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
        .toString(16)
        .padStart(2, "0")
        .replace("NaN", "")
    )
    .join("")}`;

export function showInfo(id, trailer, type, genres, container) {
  (async function () {
    fetchSimilar(id).then((data) => data);
    let details = "";
    let similar = "";
    if (type == "M O V I E") {
      details = await fetchMovieDetails(id).then((data) => data);
      similar = await fetchSimilar(id).then((data) => data.results);
    } else {
      details = await fetchShowDetails(id).then((data) => data);
      similar = await fetchSimilarTV(id).then((data) => data.results);
    }
    moreInfo(details, trailer, similar, container, type, genres);
  })();
}

export function showMovie(trailer) {
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
  onYouTubeIframeAPIReady(3, "displayMovie", trailer);
}

export function showTV(trailer) {
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
  onYouTubeIframeAPIReady(3, "displayMovie", trailer);
}

export function hoverItem(id, trailer, type, genres) {
  var viewportWidth = $(window).width();
  if (viewportWidth >= 600) {
    let users = JSON.parse(localStorage.getItem("users")) ?? [];
    let user_id = sessionStorage.getItem("user_id");
    let favourites = users[user_id].favourites;
    let favouritesTV = users[user_id].favouritesTV;
    let liked = users[user_id].liked;
    let fav_button = "";
    let color = "";
    if (
      !favourites.includes(id.toString()) &&
      !favouritesTV.includes(id.toString())
    )
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    if (!liked.includes(id.toString())) color = "#0d0d0d";
    else color = "#fff";

    let play = "";
    if (type == "M O V I E") {
      play = "playMovie";
    } else {
      play = "playTV";
    }
    $(".secondSection").append(`
      <div class="hoverItem" value="${[id, trailer, type, genres]}">
        <div class="trailerBox mb-1">
        <div id="itemTrailer"></div>
        </div>
          <i class="material-icons" id="${play}" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"style="color:${color};text-shadow: 0 0 1px #fff;"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>

          <p style="width:100%;word-wrap:break-word;font-size:12px;">${genres}</p>
          
      </div>
  `);
    onYouTubeIframeAPIReady(4, "itemTrailer", trailer);
  }
}

export function trailerInfo(movie, genres) {
  let name = movie.title ? movie.title : movie.name;
  let type = movie.title ? "M O V I E" : "S E R I E S";
  let play = movie.title ? "playMovie" : "playTV";
  $(".details").append(`
         <div class="options" value="${[
           movie.id,
           movie.trailer,
           type,
           genres,
         ]}" id="0">
          <img src="../images/Nlogo.png" alt="" />${type}
          <p class="title">${name}</p>
          <p class="watch">Watch ${name} Now</p>
          <span id="desc">
            ${movie.overview}
          </span>
          <button type="button" id="${play}"  class="btn mt-2">
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
