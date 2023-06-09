import { fetchPoster, fetchPosterTV } from "../fetch/fetch.js";
let users = JSON.parse(localStorage.getItem("users"));
let user_id = sessionStorage.getItem("user_id");
let favouriteId = users[user_id];
let favourites = [];
let favouriteTV = [];
for (let id of favouriteId.favourites) {
  let obj = {};
  obj.id = id;
  favourites.push(obj);
}

for (let id of favouriteId.favouritesTV) {
  let obj = {};
  obj.id = id;
  favouriteTV.push(obj);
}

for (let item of favourites) {
  let poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of favouriteTV) {
  let poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}

let fav_button = "";
export function favMovies() {
  for (let item of favourites) {
    if (!favouriteId.favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $(".myList .row").append(`        
      <div class="col-md-2 col-sm-12 mt-5">
          <div class="options" value="${item.id}">
            <img src="https://image.tmdb.org/t/p/original/${item.poster}" alt="" />
            <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
              >play_circle_filled</i>
            <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites" >${fav_button}</i>
            <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
              >thumb_up</i>
            <i class="material-icons" id="more" data-toggle="tooltip" title="More Info" style="float: right" >arrow_drop_down_circle</i>
          </div>
        </div>
    `);
  }
  for (let item of favouriteTV) {
    if (!favouriteId.favouritesTV.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $(".myList .row").append(`        
      <div class="col-md-2 col-sm-12 mt-5">
          <div class="options" value="${item.id}">
            <img src="https://image.tmdb.org/t/p/original/${item.poster}" alt="" />
            <i class="material-icons" id="playTV" data-toggle="tooltip" title="Play"
              >play_circle_filled</i>
            <i class="material-icons" id="favTV" data-toggle="tooltip" title="Add to Favourites" >${fav_button}</i>
            <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
              >thumb_up</i>
            <i class="material-icons" id="more" data-toggle="tooltip" title="More Info" style="float: right" >arrow_drop_down_circle</i>
          </div>
        </div>
    `);
  }
}
