import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

export function moreInfo(movie, key, similar, container) {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let favourites = users[user_id].favourites;
  let fav_button = "";
  console.log(container);
  if (!favourites.includes(movie.id.toString()))
    fav_button = "add_circle_outline";
  else fav_button = "check_circle";
  let name = movie.title ? movie.title : movie.name;
  let play = movie.title ? "playMovie" : "playTV";

  $(`.${container}`).append(`      
      <div class="container moreInfo">
        <div class="trailer">
          <div id="trailerVideo"></div>
          <i class="material-icons" id="closeInfo" >close</i>
          <div class="options" value="${movie.id}" id="1">
            <p class="title">${name}</p>
            <button type="button" id="${play}" class="btn play mt-2">
              <i class="material-icons">play_arrow</i>
              <span>Play</span>
            </button>
            <button type="button" class="btn mt-2" value="${movie.id}">
            <i class="material-icons" id="fav"  data-toggle="tooltip" title="Add to Favourites" style="font-size:30px">${fav_button}</i>
            </button>
            <button type="button" class="btn mt-2">
            <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
             style="font-size:30px">thumb_up</i>
            </button>
            <i class="material-icons volume"  data-toggle="tooltip" title="Like"
             style="font-size:30px;float:right">volume_off</i>
          </div>
          <div class="container similar">
              <p class="overview">${movie.overview}</p>
              More Like This
              <br><br>
              <div class="row  text-white">
              </div>
          </div>
        </div>
      </div>
`);
  onYouTubeIframeAPIReady(1, "trailerVideo", key);

  for (let item of similar) {
    if (!favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let name = item.title ? item.title : item.name;
    $(".moreInfo .row").append(`
        <div class="col-md-4 col-sm-12 mt-4">
            <div class="similarMovie" value="${item.id}">
              <img src="https://image.tmdb.org/t/p/original/${item.backdrop_path}"/>
                <b>${name}</b>
                <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites" style="font-size:24px">${fav_button}</i>
              <div class="description">
                ${item.overview}
              </div>
            </div>
        </div>
      `);
  }
}
