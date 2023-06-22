import { onYouTubeIframeAPIReady } from "./YouTubeApi.js";

// function to create more inforamtion div of a movie or series.
export function moreInfo(movie, trailer, similar, container, type, genres) {
  let users = JSON.parse(localStorage.getItem("users")) ?? [];
  let user_id = sessionStorage.getItem("user_id");
  let favourites = users[user_id].favourites;
  let favouritesTV = users[user_id].favouritesTV;
  let liked = users[user_id].liked;
  let fav_button = "";
  let color = "";
  if (
    !favourites.includes(movie.id.toString()) &&
    !favouritesTV.includes(movie.id.toString())
  )
    fav_button = "add_circle_outline";
  else fav_button = "check_circle";

  if (!liked.includes(movie.id.toString())) color = "#0d0d0d";
  else color = "#fff";

  let name = movie.title ? movie.title : movie.name;
  let play = movie.title ? "playMovie" : "playTV";
  $(`.${container}`).append(`      
      <div class="container moreInfo">
        <div class="trailer">
          <div id="trailerVideo"></div>
          <i class="material-icons" id="closeInfo" >close</i>
          <div class="options" value="${[movie.id, trailer, type]}" id="1">
            <p class="title">${name}</p>
            <button type="button" id="${play}" class="btn play mt-2">
              <i class="material-icons">play_arrow</i>
              <span>Play</span>
            </button>
            <button type="button" class="btn mt-2" value="${[
              movie.id,
              trailer,
              type,
            ]}">
            <i class="material-icons" id="fav"  data-toggle="tooltip" title="Add to Favourites" style="font-size:30px">${fav_button}</i>
            </button>
            <button type="button" class="btn mt-2" value="${[
              movie.id,
              trailer,
              type,
            ]}">
            <i class="material-icons" id="like" data-toggle="tooltip" title="Like" style="font-size:30px;color:${color};text-shadow: 0 0 1px #fff; ">thumb_up</i>
            </button>
            <i class="material-icons volume"  data-toggle="tooltip" title="volume"
             style="font-size:30px;float:right">volume_off</i>
          </div>
          <div class="container similar">
              <div class="row">
                <div class="col-md-8">
                  <p class="overview">${movie.overview}</p>
                </div>  
                <div class="col-md-4">Genre:<b>${genres
                  .split(" . ")
                  .join(",")}</b></div>
                <hr>
              <h2><b>More Like This</b></h2>
              </div>
              <br><br>
              <div class="row  text-white">
              </div>
          </div>
        </div>
      </div>
`);
  // sets iframe video for selected movie or series in more info
  onYouTubeIframeAPIReady(1, "trailerVideo", trailer);

  // for loop creates movies or series similar to selected movie or series.
  for (let item of similar) {
    if (
      !favourites.includes(item.id.toString()) &&
      !favouritesTV.includes(item.id.toString())
    )
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let name = item.title ? item.title : item.name;
    let type = item.title ? "M O V I E" : "S E R I E S";
    if (item.backdrop_path != null) {
      $(".moreInfo .row").append(`
        <div class="col-md-4 col-sm-12 mt-4">
            <div class="similarMovie" value="${[item.id, "", type]}">
              <img src="https://image.tmdb.org/t/p/original/${
                item.backdrop_path
              }"/>
                <b>${name}</b>
                <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites" style="font-size:24px;cursor:pointer;">${fav_button}</i>
              <div class="description">
                ${item.overview}
              </div>
            </div>
        </div>
      `);
    }
  }
}
