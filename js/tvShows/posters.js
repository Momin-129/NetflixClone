import {
  fetchIndianTV,
  fetchAnimeTV,
  fetchPosterTV,
  fetchTrailerTV,
  fetchKdramas,
  fetchMysteryTV,
  fetchTrendingTV,
} from "../fetch/fetch.js";

import { showPoster, setTrailerPoster } from "../mainPage/posters.js";

let tvShows = await fetchTrendingTV().then((data) => data.results);
let indianTV = await fetchIndianTV().then((data) => data.results);
let animeTV = await fetchAnimeTV().then((data) => data.results);
let kdramas = await fetchKdramas().then((data) => data.results);
let mystery = await fetchMysteryTV().then((data) => data.results);
let poster = "";

for (let item of tvShows) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of indianTV) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of kdramas) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
}
for (let item of mystery) {
  const [trailer, poster] = await setTrailerPoster(item);
  item.trailer = trailer;
  item.poster = poster;
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
