import {
  fetchPopularTV,
  fetchIndianTV,
  fetchAnimeTV,
  fetchPosterTV,
  fetchTrailerTV,
} from "../fetch/fetch.js";

fetchIndianTV().then((data) => console.log(data));

let tvShows = await fetchPopularTV().then((data) => data.results);
let indianTV = await fetchIndianTV().then((data) => data.results);
let animeTV = await fetchAnimeTV().then((data) => data.results);
let poster = "";
let users = JSON.parse(localStorage.getItem("users")) ?? [];
let user_id = sessionStorage.getItem("user_id");
let favouritesTV = users[user_id].favouritesTV;
let fav_button = "";

for (let item of tvShows) {
  let trailer = await fetchTrailerTV(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randomMovie.key;
    item.type = "S E R I E S";
    poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
    for (let j of poster) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        item.poster = j.file_path;
        break;
      } else item.poster = j.file_path;
    }
  }
}
for (let item of indianTV) {
  let trailer = await fetchTrailerTV(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randomMovie.key;
    item.type = "S E R I E S";
    poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
    for (let j of poster) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        item.poster = j.file_path;
        break;
      } else item.poster = j.file_path;
    }
  }
}

for (let item of animeTV) {
  let trailer = await fetchTrailerTV(item.id).then((data) => data.results);
  if (trailer.length > 0) {
    let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
    item.trailer = randomMovie.key;
    item.type = "S E R I E S";
    poster = await fetchPosterTV(item.id).then((data) => data.backdrops);
    for (let j of poster) {
      if (j.iso_639_1 != null && j.iso_639_1 == "en") {
        item.poster = j.file_path;
        break;
      } else item.poster = j.file_path;
    }
  }
}

export function createPosters() {
  for (let item of tvShows) {
    if (!favouritesTV.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let values = [item.id, item.trailer, item.type];
    if (item.trailer != undefined && item.poster != undefined) {
      $("#section1").append(
        `
      <div class="item" value="${values}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
      </div>
      `
      );
    }
  }
  for (let item of indianTV) {
    if (!favouritesTV.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let values = [item.id, item.trailer, item.type];
    if (item.trailer != undefined && item.poster != undefined) {
      $("#section2").append(
        `
      <div class="item" value="${values}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
      </div>
      `
      );
    }
  }
  for (let item of animeTV) {
    if (!favouritesTV.includes(item.id.toString()))
      fav_button = "add_circle_outline";
    else fav_button = "check_circle";
    let values = [item.id, item.trailer, item.type];
    if (item.trailer != undefined && item.poster != undefined) {
      $("#section3").append(
        `
      <div class="item" value="${values}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
      </div>
      `
      );
    }
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
