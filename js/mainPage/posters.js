import {
  fetchPopular,
  fetchBollyWood,
  fetchAnime,
  fetchComedy,
  fetchPoster,
  fetchPopularTV,
  fetchPosterTV,
} from "../fetch/fetch.js";

let movies = await fetchPopular().then((data) => data.results);
let bollywood = await fetchBollyWood().then((data) => data.results);
let comedy = await fetchComedy().then((data) => data.results);
let anime = await fetchAnime().then((data) => data.results);
let tv = await fetchPopularTV().then((data) => data.results);
let poster = "";
let users = JSON.parse(localStorage.getItem("users")) ?? [];
let user_id = sessionStorage.getItem("user_id");
let favourites = users[user_id].favourites;
let favouritesTV = users[user_id].favouritesTV;
let fav_button = "";

for (let item of movies) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of anime) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of bollywood) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of comedy) {
  poster = await fetchPoster(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}
for (let item of tv) {
  poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
  for (let j of poster) {
    if (j.iso_639_1 != null && j.iso_639_1 == "en") {
      item.poster = j.file_path;
      break;
    } else item.poster = j.file_path;
  }
}

export function createPosters() {
  for (let item of movies) {
    if (!favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $("#section1").append(
      `
      <div class="item" value="${item.id}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of bollywood) {
    if (!favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $("#section2").append(
      `
      <div class="item" value="${item.id}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of anime) {
    if (!favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $("#section3").append(
      `
      <div class="item" value="${item.id}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of comedy) {
    if (!favourites.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $("#section4").append(
      `
      <div class="item" value="${item.id}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  for (let item of tv) {
    if (!favouritesTV.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";

    $("#section5").append(
      `
      <div class="item" value="${item.id}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          <i class="material-icons" id="playMovie" data-toggle="tooltip" title="Play"
           >play_circle_filled</i>
          <i class="material-icons" id="fav" data-toggle="tooltip" title="Add to Favourites">${fav_button}</i>
          <i class="material-icons" id="like" data-toggle="tooltip" title="Like"
           >thumb_up</i>
          <i class="material-icons" id="more" data-toggle="tooltip" title="More Info"                     style="float:right;">arrow_drop_down_circle</i>
      </div>
      `
    );
  }

  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      dots: false,
      navText: [
        "<i class='material-icons'>chevron_left</i>",
        "<i class='material-icons'>chevron_right</i>",
      ],
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        1000: {
          items: 6,
        },
      },
    });
  })(jQuery);
}
