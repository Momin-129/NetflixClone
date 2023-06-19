import {
  fetchTrending,
  fetchTrendingTV,
  fetchUpcoming,
  fetchAiringTodayTV,
  fetchPoster,
  fetchPosterTV,
  fetchTrailer,
  fetchTrailerTV,
} from "../fetch/fetch.js";

let movies = await fetchTrending().then((data) => data.results);
let tv = await fetchTrendingTV().then((data) => data.results);
let upcomingMovies = await fetchUpcoming().then((data) => data.results);
let airingToday = await fetchAiringTodayTV().then((data) => data.results);
let poster = "";

function showPoster(item, section) {
  let values = [item.id, item.trailer, item.type];
  if (item.trailer != undefined && item.poster != undefined) {
    $(`#section${section}`).append(
      `
      <div class="item" value="${values}">
           <img id="more" src="https://image.tmdb.org/t/p/original${item.poster}" />
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

for (let item of movies) {
  setTrailerPoster(item);
}
for (let item of upcomingMovies) {
  setTrailerPoster(item);
}
for (let item of airingToday) {
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

for (let item of tv) {
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
  for (let item of movies) {
    showPoster(item, 1);
  }

  for (let item of tv) {
    showPoster(item, 2);
  }
  for (let item of upcomingMovies) {
    showPoster(item, 3);
  }
  for (let item of airingToday) {
    showPoster(item, 4);
  }

  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: true,
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
}
