import {
  fetchIndianTV,
  fetchAnimeTV,
  fetchKdramas,
  fetchMysteryTV,
  fetchTrendingTV,
} from "../fetch/fetch.js";

import { showPoster, setTrailerPoster } from "../mainPage/posters.js";

// fetching different tv shows
let tvShows = await fetchTrendingTV().then((data) => data.results);
let indianTV = await fetchIndianTV().then((data) => data.results);
let animeTV = await fetchAnimeTV().then((data) => data.results);
let kdramas = await fetchKdramas().then((data) => data.results);
let mystery = await fetchMysteryTV().then((data) => data.results);

// for loops to call for each individual item to set their trailer poster and gneres
for (let item of tvShows) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of indianTV) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of kdramas) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}
for (let item of mystery) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

for (let item of animeTV) {
  const [trailer, poster, genre] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
  item.genre = genre;
}

// function to create posters for each indiviual item
export function createPosters() {
  for (let item of tvShows) {
    showPoster(item, 1);
  }
  for (let item of indianTV) {
    showPoster(item, 2);
  }
  for (let item of animeTV) {
    showPoster(item, 3);
  }
  for (let item of kdramas) {
    showPoster(item, 4);
  }
  for (let item of mystery) {
    showPoster(item, 5);
  }

  // owl-carousel handler
  (function ($) {
    "use strict";
    $(".owl-carousel").owlCarousel({
      loop: true,
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
