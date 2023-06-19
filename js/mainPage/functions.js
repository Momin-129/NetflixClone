import {
  fetchMovieDetails,
  fetchSimilar,
  fetchShowDetails,
  fetchSimilarTV,
  MovieList,
  TVList,
} from "../fetch/fetch.js";
import { moreInfo } from "./moreInfo.js";
import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

let movieGenres = await MovieList().then((data) => data.genres);
let tvGenres = await TVList().then((data) => data.genres);
let movieGenMap = new Map();
let tvGenMap = new Map();
movieGenres.forEach((element) => {
  movieGenMap.set(element.id, element.name);
});
tvGenres.forEach((element) => {
  tvGenMap.set(element.id, element.name);
});

export function showInfo(id, trailer, type, container) {
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
    moreInfo(details, trailer, similar, container, type);
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
    let genreList = genres.split("-");
    let users = JSON.parse(localStorage.getItem("users")) ?? [];
    let user_id = sessionStorage.getItem("user_id");
    let favourites = users[user_id].favourites;
    let favouritesTV = users[user_id].favouritesTV;
    let fav_button = "";
    if (
      !favourites.includes(id.toString()) &&
      !favouritesTV.includes(id.toString())
    )
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let play = "";
    if (type == "M O V I E") {
      play = "playMovie";
      for (let i = 0; i < genreList.length; i++) {
        let id = parseInt(genreList[i]);
        let genreName = movieGenMap.get(id);
        genreList[i] = genreName;
      }
      genreList = genreList.join(" . ");
    } else {
      play = "playTV";
      for (let i = 0; i < genreList.length; i++) {
        let id = parseInt(genreList[i]);
        let genreName = tvGenMap.get(id);
        genreList[i] = genreName;
      }
      genreList = genreList.join(" . ");
    }
    $(".secondSection").append(`
      <div class="hoverItem" value="${[id, trailer, type]}">
        <div class="trailerBox">
        <div id="itemTrailer"></div>
        </div>
          <i class="material-icons" id="${play}" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>

          <p style="width:100%;word-wrap:break-word;padding:5px;font-size:12px;">${genreList}</p>
          
      </div>
  `);
    onYouTubeIframeAPIReady(4, "itemTrailer", trailer);
  }
}

export function trailerInfo(movie) {
  let name = movie.title ? movie.title : movie.name;
  let type = movie.title ? "M O V I E" : "S E R I E S";
  let play = movie.title ? "playMovie" : "playTV";
  $(".details").append(`
         <div class="options" value="${[movie.id, movie.trailer, type]}" id="0">
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
