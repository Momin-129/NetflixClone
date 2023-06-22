import { fetchMovieDetails, fetchShowDetails } from "../fetch/fetch.js";

import { setTrailerPoster } from "../mainPage/posters.js";

let users = JSON.parse(localStorage.getItem("users"));
let user_id = sessionStorage.getItem("user_id");
let favMovies = users[user_id].favourites;
let favTV = users[user_id].favouritesTV;
let movieList = [];
let tvList = [];

// getting list of favrouite movies and tv shows.
for (let item of favMovies) {
  movieList.push(await fetchMovieDetails(item).then((data) => data));
}
for (let item of favTV) {
  tvList.push(await fetchShowDetails(item).then((data) => data));
}

// dispalying posters of movies and tv shows
function showPoster(item, section) {
  let values = [item.id, item.trailer, item.type, item.genre];
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

// looping through each individual item in both lists.
for (let item of movieList) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

for (let item of tvList) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

// creating poster for each individual item.
export function createPosters() {
  for (let item of movieList) {
    showPoster(item, 1);
  }

  for (let item of tvList) {
    showPoster(item, 1);
  }

  // owl-carousel handler
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
