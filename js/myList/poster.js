import {
  fetchMovieDetails,
  fetchShowDetails,
  MovieList,
  TVList,
} from "../fetch/fetch.js";

import { setTrailerPoster } from "../mainPage/posters.js";

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

function showPoster(item, section) {
  let type = item.title ? "M O V I E" : "S E R I E S";

  let genres = [];
  if (item.genre_ids) genres = item.genre_ids;
  else {
    for (let genre of item.genres) {
      genres.push(genre.id);
    }
  }

  let genreList = genres;
  if (type == "M O V I E") {
    for (let i = 0; i < genreList.length; i++) {
      let id = parseInt(genreList[i]);
      let genreName = movieGenMap.get(id);
      genreList[i] = genreName;
    }
    genreList = genreList.join(" . ");
  } else {
    for (let i = 0; i < genreList.length; i++) {
      let id = parseInt(genreList[i]);
      let genreName = tvGenMap.get(id);
      genreList[i] = genreName;
    }
    genreList = genreList.join(" . ");
  }
  let values = [item.id, item.trailer, item.type, genreList];
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

for (let item of movieList) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}

for (let item of tvList) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
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
