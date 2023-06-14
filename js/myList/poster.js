import {
  fetchPoster,
  fetchPosterTV,
  fetchTrailer,
  fetchTrailerTV,
  fetchMovieDetails,
  fetchShowDetails,
} from "../fetch/fetch.js";

let poster = "";

let users = JSON.parse(localStorage.getItem("users"));
let user_id = sessionStorage.getItem("user_id");
let favMovies = users[user_id].favourites;
let favTV = users[user_id].favouritesTV;
let movieList = [];
let tvList = [];
for (let item of favMovies) {
  movieList.push(await fetchMovieDetails(item).then((data) => data));
}
for (let item of favTV) {
  tvList.push(await fetchShowDetails(item).then((data) => data));
}

function showPoster(item, section) {
  let values = [item.id, item.trailer, item.type];
  if (item.trailer != undefined && item.poster != undefined) {
    $(`#section${section}`).append(
      `
      <div class="col-md-2 col-sm-12 mt-3 pb-5">
          <div class="item" value="${values}">
               <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
          </div>
      </div>
      `
    );
  }
}

function setTrailerPoster(item) {
  (async function () {
    let trailer = await fetchTrailer(item.id).then((data) => data.results);
    if (trailer.length > 0) {
      let randomMovie = trailer[Math.floor(Math.random() * trailer.length)];
      item.trailer = randomMovie.key;
      item.type = "M O V I E";
      poster = await fetchPoster(item.id).then((data) => data.backdrops);
      for (let j of poster) {
        if (j.iso_639_1 != null && j.iso_639_1 == "en") {
          item.poster = j.file_path;
          break;
        } else item.poster = j.file_path;
      }
    }
  })();
}

for (let item of movieList) {
  setTrailerPoster(item);
}

for (let item of tvList) {
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
  for (let item of movieList) {
    showPoster(item, 1);
  }

  for (let item of tvList) {
    showPoster(item, 1);
  }

  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      dots: false,
      touchDrag: true,
      mouseDrag: true,
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
          items: 5,
        },
      },
    });
  })(jQuery);
  $(".loader").remove();
  $("#header").show();
  $(".firstSection").show();
  $(".secondSection").show();
  $("#footer").show();
}
