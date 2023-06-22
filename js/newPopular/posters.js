import {
  fetchTrending,
  fetchTrendingTV,
  fetchUpcoming,
  fetchAiringTodayTV,
} from "../fetch/fetch.js";

import { showPoster, setTrailerPoster } from "../mainPage/posters.js";

let movies = await fetchTrending().then((data) => data.results);
let tv = await fetchTrendingTV().then((data) => data.results);
let upcomingMovies = await fetchUpcoming().then((data) => data.results);
let airingToday = await fetchAiringTodayTV().then((data) => data.results);

for (let item of movies) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of upcomingMovies) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of airingToday) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

for (let item of tv) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
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
          items: 6,
        },
      },
    });
  })(jQuery);
}
